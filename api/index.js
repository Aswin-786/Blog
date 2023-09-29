const express = require('express')
const app = express()
const cors = require('cors')

const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')

const User = require('./models/User')
const Post = require('./models/Post')


const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const { uploadMiddleware } = require('./middleware/fileUpload')
const { fs } = require('./middleware/fileUpload')

// const multer = require('multer')
// const uploadMiddleware = multer({
//   dest: 'uploads/',
//   limits: {
//     fieldSize: 10 * 1024 * 1024, // Increase field size limit to 10MB or adjust as needed
//   },
// });


// const fs = require('fs');
// const { log } = require('util');
// const { log } = require('console');




app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3002' }))
app.use(cookieParser())

app.use('/uploads', express.static(__dirname + '/uploads'))

const salt = bcrypt.genSaltSync(10);
const SECRET = 'jdkshfaksjfkjads'

mongoose.connect('mongodb+srv://aswinakg213:aswinakg213@cluster0.j1stypx.mongodb.net/MERN-BLOG')



app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    })
    res.json(userDoc)
  } catch (e) {
    res.status(400).json(e)
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log(req.body);
  const userDoc = await User.findOne({ username })
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id: userDoc._id,
          username
        })
      })
    } else {
      res.status(404).json({ message: 'wrong credentials' })
    }
  } else {
    res.status(401).json({ message: 'wronng user name provided' })
  }

})

app.get('/profile', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, SECRET, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })

  // res.json(req.cookies)
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  // console.log(req.file);
  const { originalname, path } = req.file
  const ext = originalname.split('.')[1]
  const newPath = path + '.' + ext
  fs.renameSync(path, newPath)
  const { token } = req.cookies
  jwt.verify(token, SECRET, {}, async (err, info) => {
    if (err) throw err
    const { title, summary, content } = req.body
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id
    })
    res.json(postDoc)
  })
})


app.get('/post', async (req, res) => {
  const data = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20)
  res.json(data)
})


app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const postDoc = await Post.findById(id).populate('author', ['username'])
  res.json(postDoc)
})

app.put(`/post`, uploadMiddleware.single('file'), async (req, res) => {

  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file
    const ext = originalname.split('.')[1]
    newPath = path + '.' + ext
    fs.renameSync(path, newPath)
  }

  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, info) => {
    if (err) throw err
    const { id, title, summary, content } = req.body
    const postDoc = await Post.findById(id)

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

    if (!isAuthor) {
      return res.status(400).json('you are not the router')
    }

    await Post.updateOne(
      { _id: id, author: info.id }, // Specify the document to update based on its _id and author
      {
        $set: {
          title,
          summary,
          content,
          cover: newPath ? newPath : postDoc.cover
        }
      }
    );
    res.json(postDoc)
  })
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.deleteOne({ _id: id })
    if (!postDoc) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(4000)
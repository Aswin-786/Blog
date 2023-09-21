const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

const fs = require('fs')

const Post = require('./models/Post')


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())

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
  const userDoc = await User.findOne({ username })
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

  const { title, summary, content } = req.body
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  })



  res.json(postDoc)
})


app.listen(4000)
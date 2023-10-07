const multer = require('multer')

const uploadMiddleware = multer({
  dest: 'uploads/',
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});

const fs = require('fs');
module.exports = { uploadMiddleware, fs }

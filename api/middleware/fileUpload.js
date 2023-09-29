const multer = require('multer')

const uploadMiddleware = multer({
  dest: 'uploads/',
  limits: {
    fieldSize: 10 * 1024 * 1024, // Increase field size limit to 10MB or adjust as needed
  },
});


const fs = require('fs');

module.exports = { uploadMiddleware, fs }

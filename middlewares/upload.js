const multer = require('multer');
const path = require('path');

// Define the target folder for uploads
const targetFolder = path.join(__dirname, '..', 'uploads');
console.log('Target folder for uploads:', targetFolder);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Setting upload destination');
    cb(null, targetFolder); // Upload files to the targetFolder
  },
  filename: (req, file, cb) => {
    console.log('Setting filename for upload');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const newFilename = `${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});

module.exports = multer({storage})
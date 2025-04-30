const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Set up storage for uploaded files
const   UPLOAD_FOLDER = "../public/assets/images/uploads/";  
console.log("UPLOAD_FOLDER: "+UPLOAD_FOLDER);
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, UPLOAD_FOLDER));
  }, 
  filename: (req, file, cb) => {
    const filePath = path.join(__dirname, UPLOAD_FOLDER, file.originalname);

    if (fs.existsSync(filePath)) {
      return;
    } else {
      cb(null, file.originalname);
    }
  }
});

// Create the multer instance
const upload = multer({ storage: storage });
module.exports = upload;
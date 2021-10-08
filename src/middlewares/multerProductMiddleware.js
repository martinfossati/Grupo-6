const path = require('path');
const multer = require('multer');

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {      
     cb(null, path.join(__dirname,'../../public/images/products'));   
    },
    filename: function(req, file, cb) {         
     let imageName = 'imgProduct' + Date.now() + path.extname(file.originalname);
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

module.exports = uploadFile;
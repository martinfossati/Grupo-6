const path = require('path');
const multer = require('multer');

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {      
     cb(null, path.join(__dirname, '../../public/images/avatars'));   
    },
    filename: function(req, file, cb) {         
     let imageName = 'avatarUser' + Date.now() + path.extname(file.originalname);
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

module.exports = uploadFile;
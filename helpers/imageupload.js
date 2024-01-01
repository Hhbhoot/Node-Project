const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'public/images')
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname.replace(/\s+/g," ")}`);
    }
});


exports.upload = multer({storage : storage});

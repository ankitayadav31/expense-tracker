const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary");

//configure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary:  cloudinary,
    params: {
        folder: "expense-tracker",
        allowed_formats: ["jpg", "png", "jpeg"],
    }
})

//file filter
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png'];
//     if(allowedTypes.includes(file.mimetype)){
//         cb(null, true)
//     }else{
//         cb(new Error('Only .jpeg .jpg and .png formats are allowed'), false);
//     }
// };

const upload = multer({storage})

module.exports = upload;
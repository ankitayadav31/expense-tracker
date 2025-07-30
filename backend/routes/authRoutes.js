const express = require("express");
const { protect } = require("../middleware/authMiddleWare")

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if(!req.file){
    return res.status(400).json({message: "no file uploaded"});
  }
  try {
    const imageUrl = req.file.path;
    res.json({ imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed", error: err });
  }
});

module.exports = router;

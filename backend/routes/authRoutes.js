const express = require("express");
const { protect } = require("../middleware/authMiddleWare");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    console.log("📸 Image upload route hit");

    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("✅ Cloudinary file object:", req.file);

    const imageUrl = req.file.path || req.file.secure_url;

    console.log("🌐 Image URL:", imageUrl);

    res.json({ imageUrl });
  } catch (err) {
    console.error("🔥 Upload Error:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
});


module.exports = router;

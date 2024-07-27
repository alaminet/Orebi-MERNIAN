require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// multer image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("avatar"), function (req, res) {
  res.send(`/uploads/images/${req.file.filename}`);
  setTimeout(() => {
    const fs = require("fs");
    const filePath = `./uploads/images/${req.file.filename}`; // Replace with the actual path to your file
    // Remove the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
        return;
      }
      console.log(`File ${filePath} has been successfully removed.`);
    });
  }, 3000);
});

// show static file
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Image Server is running on port ${port}`);
});

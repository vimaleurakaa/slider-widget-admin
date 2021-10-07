const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

//storage-config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    //   file.fieldname + "-" + Date.now() + path.extname(file.originalname
    cb(null, file.originalname);
  },
});

const WriteTextToFileAsync = async (contentToWrite) => {
  fs.writeFile("data/data.json", contentToWrite, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file updated!");
    }
  });
};

const upload = multer({ storage: storage });

//default router
router.get("/", (req, res) => {
  res.status(200).send({ message: "Mediassist Server is Running..." });
});

// Upload Image
router.post("/upload", upload.single("upload"), (req, res, next) => {
  return res.json({
    image: req.file.path,
  });
});

// CRUD JSON DATA
router.post("/write", async (req, res, next) => {
  const requestContent = JSON.stringify(req.body);
  await WriteTextToFileAsync(requestContent);
});

//404 route
router.use((req, res, next) =>
  res.status(404).send({
    message: "Could not find the requested route!",
  })
);

module.exports = router;

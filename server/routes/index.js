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

const WriteTextToFileAsync = async (contentToWrite, res) => {
  fs.writeFile("data/data.json", contentToWrite, (err) => {
    if (err) {
      return res.status(400).send({ data: contentToWrite, status: false });
    } else {
      console.log(contentToWrite, res);
      return res.status(200).send({ data: contentToWrite, status: true });
    }
  });
};

const upload = multer({ storage: storage });

//default router
router.get("/", (req, res) => {
  res.status(200).send({ message: "Mediassist Server is Running..." });
});

//JSON API ENDPOINT
router.get("/api/v1/data", (req, res) => {
  fs.readFile("./data/data.json", (err, data) => {
    let obj = JSON.parse(data);
    res.json(obj);
  });
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
  await WriteTextToFileAsync(requestContent, res);
});

//404 route
router.use((req, res, next) =>
  res.status(404).send({
    message: "Could not find the requested route!",
  })
);

module.exports = router;

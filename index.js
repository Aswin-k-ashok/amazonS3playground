const express = require("express");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {uploadFile,getFileStream} = require("./s3");

const app = express();

app.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  // apply filter
  // resize

  const result = await uploadFile(file);
  console.log(result);
  
  let resultHandler = function (err) {
    if (err) {
        console.log("unlink failed", err);
    } else {
        console.log("file deleted");
    }
}

fs.unlink(req.file.path, resultHandler);
  res.send("file uploaded successfully");
});

app.listen(5000, () => console.log("listening on port 5000"));

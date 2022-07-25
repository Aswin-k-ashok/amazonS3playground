const { S3 } = require("aws-sdk");
const AWS = require("aws-sdk");
require("dotenv").config();
const fs = require("fs");
const BUCKET = process.env.AWS_BUCKET_NAME;

const KEY_ID = process.env.AWS_ACCESS_KEY;
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const REGION = process.env.AWS_REGION;

const s3 = new AWS.S3({
  region: REGION,
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: BUCKET,
    Key: file.filename,
    Body: fileStream,
  };

  return s3.upload(params).promise();
};

module.exports = uploadFile;

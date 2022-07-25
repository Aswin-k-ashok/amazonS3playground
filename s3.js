require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const AWS = require('aws-sdk')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const AccessKeyID = process.env.AWS_ACCESS_KEY
const SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new AWS.S3({
  region,
  AccessKeyID,
  SecretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
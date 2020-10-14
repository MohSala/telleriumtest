import { config } from "../config/config"
import AWS from "aws-sdk";
const multer = require('multer')
const multerS3 = require('multer-s3')
AWS.config.update({
  secretAccessKey: config.aws.secret_access_key,
  accessKeyId: config.aws.access_key,
  region: config.aws.region,
})
const s3 = new AWS.S3()

// filter image type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true)
  }
  else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG Format are allowed'), false);
  }
}

export const upload = multer({
  fileFilter,
  storage: multerS3({
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: 'inline',
    s3: s3,
    bucket: config.aws.bucket,
    acl: "public-read",
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const name = Date.now() + "." + file.originalname.split('.').pop();
      cb(null, name)
    }
  })
}).array('photos', 10);


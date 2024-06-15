import { S3Client } from '@aws-sdk/client-s3';
import { Router } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { changeProfileImage } from '../../bll/user.js';

const profileRouter = Router();

const s3 = new S3Client();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'pawza-user-images2',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname, type: file.mimetype.split('/')[1] });
    },
    key: (req, file, cb) => {
      cb(null, req.user.id.toString());
    },
    acl: 'public-read',
  }),
  limits: { fileSize: 8 * 1024 * 1024 }, // 16MB file size limit
});

profileRouter.post('/avatar', upload.single('file'), async (req, res) => {
  const fileUri = (req.file as any).location;

  await changeProfileImage(req.user.id, `${fileUri}?v=${Math.random().toFixed(4).substring(2)}`);

  res.json({
    message: 'File uploaded successfully',
    filename: fileUri,
  });
});

export { profileRouter };

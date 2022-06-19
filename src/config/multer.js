import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('o arquivo precisa ser em jpeg ou png'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'images'));
      } else {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'documents'));
      }
    },
    filename: (req, file, cb) => {
      const extesaoArquivo = file.originalname.split('.')[1];
      const gerarNome = crypto.randomBytes(64).toString('hex');

      cb(null, `${gerarNome}.${extesaoArquivo}`);
    },
  }),
};

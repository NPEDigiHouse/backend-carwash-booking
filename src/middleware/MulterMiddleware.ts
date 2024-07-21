import multer from 'multer';

const diskStorage = (folderName: string) => {
  return multer.diskStorage({
    destination(req, file, callback) {
      callback(null, `public/uploads/${folderName}`);
    },
    filename(req, file, callback) {
      callback(null, file.originalname);
    },
  });
};

export const upload = (folderName: string) => {
  return multer({ storage: diskStorage(folderName) });
};

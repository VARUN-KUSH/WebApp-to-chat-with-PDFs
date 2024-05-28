import multer from 'multer';

// const storage = multer.memoryStorage(); // using memory storage for simplicity

// export const upload = multer({ storage });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage})
import path from'path'
import express from 'express'
import multer from 'multer'
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

    }
});


// ------------------------------------------------------------------------

function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp|gif|svg/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp|image\/gif|image\/svg/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
    
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false);
    }

}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        res.status(200).send({
            message: 'Image uploaded.',
            image: `/${req.file.path}`,
        })
    })
})

// ------------------------------------------------------------------------
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function checkFileType(file, cb) {
//     const filetypes = /jpg|jpeg|png|gif|svg/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         // cb({message: 'Images only!(.jpg/.jpeg/.png/.gif/.svg)'});
//         cb(new Error( 'Images only!(.jpg/.jpeg/.png/.gif/.svg)'));
//     }
// };

// const upload = multer({
//     storage,
// });

// router.post('/', upload.single('image'), (req, res) => {
//     res.send({
//         message: 'Imaged uploaded.',
//         image: `/${req.file.path}`,
//     });
// });

export default router;
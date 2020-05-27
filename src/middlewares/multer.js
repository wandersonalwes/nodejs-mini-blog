const multer = require('multer');
const path = require('path');

/*
 * Exporting multer settings
 */
module.exports = multer({
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            return cb(
                null,
                path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
            );
        },
        filename: (req, file, cb) => {
            file.key = `${Date.now()}-${file.originalname}`;

            return cb(null, file.key);
        },
    }),
    fileFilter(req, file, cb) {
        const allowedFiles = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/gif',
        ];

        if (allowedFiles.includes(file.mimetype)) {
            return cb(null, true);
        } else {
            return cb(new Error('Image format not allowed'));
        }
    },
    // limits: {
    //     fileSize: 2 * 1024 * 1024,
    // },
});

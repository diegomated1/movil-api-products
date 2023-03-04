import multer from 'multer';
import ui from 'uniqid';

const upload = multer({
    storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/productsImages');
    },
    filename: function (req, file, cb) {
        var id_product = ui.process();
        cb(null, `${id_product}.jpg`);
    }
})});

export default upload;
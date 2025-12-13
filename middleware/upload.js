const multer = require("multer");
const path = require("path");

// 统一的图片上传配置：所有图片都放在 public/uploads 下
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads"));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) || "";
        const base = path.basename(file.originalname, ext);
        cb(null, Date.now() + "-" + base + ext);
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("只能上传图片文件"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

module.exports = upload;


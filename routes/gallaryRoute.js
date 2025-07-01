const { renderGallerys, renderDisplayGallery, renderAddGallery, renderGallery } = require("../controller/galleryController")
const {multer,storage}=require('../middleware/multerConfig')
const upload = multer({storage:storage})
const router=require("express").Router()
router.route("/gallery").get(renderGallerys)
router.route("/displaygallery").get(renderDisplayGallery)
router.route("/addgallery").get(renderAddGallery)
router.route("/addgallery").post(upload.single('image'),renderGallery)
module.exports=router
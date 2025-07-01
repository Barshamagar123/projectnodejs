const {multer,storage}=require('../middleware/multerConfig')
const upload = multer({storage:storage})
const { renderStudents, renderAddStudent, renderStudent } = require("../controller/studentController")

const router=require("express").Router()
router.route("/students").get(renderStudents)
router.route("/addStudent").get(renderAddStudent)
router.route("/addStudent").post(upload.single('image'),renderStudent)
module.exports=router
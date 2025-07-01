const {multer,storage}=require('../middleware/multerConfig.js')
const {db, sequelize }=require("../database/db.js")
exports.renderStudent=async(request,response)=>{
    const {firstname,lastname,email,phone,birth,gender,address,studentid,course,year,semester}=request.body
await db.students.create({
    firstname:firstname,
    lastname:lastname,
    email:email,
    phone:phone,
    birth:birth,
    gender:gender,
    address:address,
    image:process.env.backendUrl + request.file.filename,
    studentid:studentid,
    course:course,
    year:year,
    semester:semester,
    
})
    response.send("added succesfully")
}
exports.renderStudents=async (request,response)=>{
    const datas=await db.students.findAll()
    response.render("./admindashboard/student/display.ejs",{hotels:datas})
}
exports.renderAddStudent=(request,response)=>{
    response.render("./admindashboard/student/addStudent.ejs")
}
const express=require("express")
const app=express()
const {multer,storage}=require('./middleware/multerConfig.js')
const {db, sequelize }=require("./database/db.js")
app.set("views engine","ejs")
const upload = multer({storage:storage})
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
const { renderRegister, renderRegisterget, renderLogin, renderLoginPage } = require("./controller/registerController.js")
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./storage/"))
app.get("/",(request,response)=>{
    response.render("home.ejs")
})
app.get("/register",renderRegisterget)
app.post("/register", renderRegister)

app.post("/login",renderLogin)
app.get("/login",renderLoginPage)

app.get("/studentdashboard",(request,response)=>{
    response.render("./studentdashboard/layout.ejs")
})
app.get("/team",(request,response)=>{
    response.render("./pages/ourTeam.ejs")
})
app.get("/students",async (request,response)=>{
    const datas=await db.students.findAll()
    response.render("./admindashboard/student/display.ejs",{hotels:datas})
})
app.get("/studentprofile/:id",async(request,response)=>{
        const id=request.params.id
     const datas=await db.students.findAll({
        where:{
            id:id
        }
     })
      response.render("./studentdashboard/stuprofile.ejs",{hotels:datas})
})
app.get("/departments",async(request,response)=>{
    const datas=await db.departments.findAll()
    response.render("./admindashboard/department/display-department.ejs",{hotels:datas})
})
app.get("/addDepartment",(request,response)=>{
    response.render("./admindashboard/department/addDepartment.ejs")
})
// Example POST handler
app.post("/addDepartment", async (req, res) => {
  try {
    const { name, manager, code,icon, staff, budget, description, status } = req.body;
    await db.departments.create({
      name,
      manager,
      code,
      icon,
      staff,
      budget,
      description,
      status
    });
    res.send("added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err.message);
  }
});
app.get("/course",(request,response)=>{
    response.render("./admindashboard/course/courses.ejs")
})
app.get("/results",(request,response)=>{
    response.render("./admindashboard/result/results.ejs")
})
app.get("/addStudent",(request,response)=>{
    response.render("./admindashboard/student/addStudent.ejs")
})
app.post("/addStudent",upload.single('image'),async(request,response)=>{
    
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
})
app.get("/teacherdashboad",(request,response)=>{
    response.render("./teacherdashboard/teacherhome.ejs")
})
app.get("/admin",(request,response)=>{
    response.render("./admindashboard/layout.ejs")
})

app.get("/adminteam",(request,response)=>{
    response.render("./admindashboard/team/displayTeam.ejs")
})
app.get("/addTeam",(request,response)=>{
    response.render("./admindashboard/team/addTeam.ejs")
})
app.get("/teacherdashboard",(request,response)=>{
    response.render("./teacherdashboard/teacherhome.ejs")
})
app.get("/addCourse",(request,response)=>{
    response.render("./admindashboard/course/addCourse.ejs")
})
app.get("/importresults",(request,response)=>{
    response.render("./admindashboard/result/importresults.ejs")
})
app.get("/events",(request,response)=>{
    response.render("./admindashboard/event/displayEvent.ejs")
})
app.get("/addEvents",(request,response)=>{
    response.render("./admindashboard/event/addEvent.ejs")
})
app.get("/addnotice",(request,response)=>{
    response.render("./admindashboard/notice/addnotice.ejs")
})
app.get("/addgallery",(request,response)=>{
    response.render("./admindashboard/gallerymgmt/addgalary.ejs")
})
app.get("/displaygallery",(request,response)=>{
    response.render("./admindashboard/gallerymgmt/displaygallery.ejs")
})
app.get("/gallery",(request,response)=>{
    response.render("./pages/gallery.ejs")
})
app.get("/notice",(request,response)=>{
    response.render("./admindashboard/notice/displaynotice.ejs")
})
app.post("addgallery",async(request,response)=>{
    const {title,image,category,date,description}=request.body
 await db.gallerys.create({
    title:title,
    image:image,
    category:category,
    date:date,
    description:description
 })
 response.send("added successfully")
})
app.listen(4000,(request,respone)=>{
    console.log("backend has started at port number 4000")
})
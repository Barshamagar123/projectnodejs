const express=require("express")
const app=express()
const {multer,storage}=require('./middleware/multerConfig.js')
const {db, sequelize }=require("./database/db.js")
app.set("view engine","ejs")
const isLogged=require("./middleware/isLogged")
const upload = multer({storage:storage})
// const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
const studentRoute=require("./routes/studentRoute.js")
const registerRoute=require("./routes/registerRoute.js")
const gallaryRoute=require("./routes/gallaryRoute.js")
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./storage/"))
// Make sure this points to the directory where images are uploaded // Try without the ./
app.get("/",(request,response)=>{
    response.render("home.ejs")
})
app.use("/",registerRoute)
app.use("/",studentRoute)

app.get("/studentdashboard",(request,response)=>{
    response.render("./studentdashboard/layout.ejs")
})

app.get("/about",(request,response)=>{
    response.render("./pages/about.ejs")
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

app.get("/teacherdashboad",(request,response)=>{
    response.render("./teacherdashboard/teacherhome.ejs")
})
app.get("/admin",(request,response)=>{
    response.render("./admindashboard/layout.ejs")
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
app.use("/",gallaryRoute)
app.get("/team",(request,response)=>{
    response.render("./pages/ourTeam.ejs")
})
app.get("/adminteam",async(request,response)=>{
   const members= await db.teams.findAll()
    response.render("./admindashboard/team/displayTeam.ejs",{groups:members})
})
app.get("/addTeam",(request,response)=>{
    response.render("./admindashboard/team/addTeam.ejs")
})
app.post("/addTeam",upload.single('image'),async(request,response)=>{
const {full_name,email,department,position,joindate,status}=request.body
   await db.teams.create({
    full_name:full_name,
    email:email,
    department:department,
    position:position,
    joindate:joindate,
    status:status,
    image:process.env.backendUrl + request.file.filename
   })
   response.send("added succesfully")
})
app.get("/vision",(request,response)=>{
    response.render("./pages/chairman.ejs")
})
app.get("/notice",(request,response)=>{
    response.render("./admindashboard/notice/displaynotice.ejs")
})
app.listen(4000,(request,respone)=>{
    console.log("backend has started at port number 4000")
})
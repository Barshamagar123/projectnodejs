const express=require("express")
const app=express()
const {db, sequelize }=require("./database/db.js")
app.set("views engine","ejs")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
app.use(express.urlencoded({ extended: true }));
app.get("/",(request,response)=>{
    response.render("home.ejs")
})
app.get("/register",(request,response)=>{
    response.render("./authentication/register.ejs")
})
app.post("/register", async (request, response) => {
  try {
    const { name, birth, gender, address, phone, email, password, confirmpassword, education, program } = request.body;
    await db.registers.create({
      name,
      birth,
      gender,
      address,
      phone,
      email,
      password: bcrypt.hashSync(password,10),
      confirmpassword,
      education,
      program
    });
    response.send("added succesfully");
  } catch (err) {
    console.error(err); // This will show the real cause in your terminal
    response.status(500).send("Error: " + err.message);
  }
});
app.post("/login",async(request,response)=>{
    const{email,password,confirmpassword}=request.body
    const registers = await db.registers.findAll({
        where:{
            email:email
        }
    })
    if(registers.length==0){
        response.send("not registered email")
    }
    else{
        const isPasswordMatch=bcrypt.compareSync(password,registers[0].password)
        if(isPasswordMatch){
            const token=jwt.sign({name:"barsha"},"thisisascretkey",{
                expiresIn: "20days"
            })
            response.cookie("token",token)
            response.redirect("/")
        }
        else{
            response.send("invalid credentails")
        }
    }
})
app.get("/login",(request,response)=>{
    response.render("./authentication/login.ejs")
})
app.get("/dashboard",(request,response)=>{
    response.render("./studentdashboard/layout.ejs")
})
app.get("/students",async (request,response)=>{
    const datas=await db.students.findAll()
    response.render("./admindashboard/student/display.ejs",{hotels:datas})
})
app.get("/studentprofile",async(request,response)=>{
     const datas=await db.students.findAll()
      response.render("./studentdashboard/profile.ejs",{hotels:datas})
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
app.post("/addStudent",async(request,response)=>{
    // console.log(request.body)
    const {firstname,lastname,email,phone,birth,gender,address,image,studentid,course,year,semester}=request.body
await db.students.create({
    firstname:firstname,
    lastname:lastname,
    email:email,
    phone:phone,
    birth:birth,
    gender:gender,
    address:address,
    image:image,
    studentid:studentid,
    course:course,
    year:year,
    semester:semester,
})
    response.send("added succesfully")
})
app.get("/admin",(request,response)=>{
    response.render("./admindashboard/layout.ejs")
})
app.get("/team",(request,response)=>{
    response.render("./admindashboard/team/displayTeam.ejs")
})
app.get("/addTeam",(request,response)=>{
    response.render("./admindashboard/team/addTeam.ejs")
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
app.get("/notice",(request,response)=>{
    response.render("./admindashboard/notice/displaynotice.ejs")
})
app.listen(4000,(request,respone)=>{
    console.log("backend has started at port number 4000")
})
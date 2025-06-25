const express=require("express")
const app=express()
const db=require("./database/db.js")
app.set("views engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.get("/",(request,response)=>{
    response.render("home.ejs")
})
app.get("/register",(request,response)=>{
    response.render("./authentication/register.ejs")
})
app.get("/login",(request,response)=>{
    response.render("./authentication/login.ejs")
})
app.get("/dashboard",(request,response)=>{
    response.render("./studentdashboard/layout.ejs")
})
app.get("/students",(request,response)=>{
    response.render("./admindashboard/student/display.ejs")
})
app.get("/departments",(request,response)=>{
    response.render("./admindashboard/department/display-department.ejs")
})
app.get("/addDepartment",(request,response)=>{
    response.render("./admindashboard/department/addDepartment.ejs")
})
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
    const {firstname,lastname,email,phone,birth,gender,address,studentid,course,year,semester}=request.body
await db.students.create({
    firstname:firstname,
    lastname:lastname,
    email:email,
    phone:phone,
    birth:birth,
    gender:gender,
    address:address,
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
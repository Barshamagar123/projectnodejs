const {db, sequelize }=require("../database/db.js")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
exports.renderRegister=async (request, response) => {
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
}
exports.renderRegisterget=(request,response)=>{
    response.render("./authentication/register.ejs")
}
exports.renderLogin=async(request,response)=>{
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
}
exports.renderLoginPage=(request,response)=>{
    response.render("./authentication/login.ejs")
}
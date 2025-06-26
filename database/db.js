const {Sequelize, DataTypes}=require('sequelize')
require('dotenv').config()
const sequelize=new Sequelize({
    database:process.env.database,
    username:process.env.username,
    password:process.env.password,
    host:process.env.host,
    port:3306,
    dialect:"mysql"
})
sequelize.authenticate()
.then(()=>{
    console.log("connected successfully")
})
.catch((err)=>{
    console.log("error aayo",err)
}
)
const db={}
db.students=require("./../model/studentAdd")(sequelize,DataTypes)
db.departments=require("./../model/departmentAdd")(sequelize,DataTypes)
db.registers=require(".././model/registerMode")(sequelize,DataTypes)
sequelize.sync({async:true}).then(()=>{
    console.log("migrated succesfully")
})

sequelize.authenticate()
.then(()=>{
    console.log("connected succesfully")
})
.catch((err)=>{
    console.log("error occurs",err)
})

module.exports={db, sequelize}

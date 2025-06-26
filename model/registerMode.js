const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const makeRegisterModel= (sequelize,DataTypes)=>{
const register=sequelize.define("registers",{
    name:{

        type: DataTypes.STRING
    },
    birth:{
        type:DataTypes.DATEONLY
    },
    gender:{
        type:DataTypes.ENUM("male","female","others")
    },
    address:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    confirmpassword:{
        type:DataTypes.STRING
    },
   education: {
    type: DataTypes.ENUM("slc", "plus2", "bachelor", "master")
},
    program:{
        type:DataTypes.STRING
    }

})
return register
}
module.exports=makeRegisterModel
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const addTeamMemberModel=(sequelize,DataTypes)=>{
    const team=sequelize.define("teams",{
        full_name:
        {
            type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    department:{
        type:DataTypes.STRING
    },
    positon:{
        type:DataTypes.STRING
    },
    joindate:{
        type:DataTypes.DATEONLY
    },
    status:{
        type:DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING
    }



})
return team
}
module.exports=addTeamMemberModel
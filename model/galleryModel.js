const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const makeGalleryModel =(sequelize,DataTypes)=>{
    const gallery=sequelize.define("gallerys",{
        title:{
            type:DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING
        },
        category:{
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.DATEONLY
        },
        description:{
            type:DataTypes.STRING
        }
    })
    return gallery
}
module.exports=makeGalleryModel

const createDepartmentAdd= (sequelize,DataTypes)=>{
    const department=sequelize.define("departments",{
        name:{
            type:DataTypes.STRING
        },
        manager:{
            type:DataTypes.STRING
        },
        code:{
            type:DataTypes.INTEGER,
            unique: true
        },
        staff:{
            type:DataTypes.STRING
        },
        budget:{
            type:DataTypes.FLOAT
        },
        icon:{

            type:DataTypes.STRING
        },
        description:{
            type:DataTypes.STRING
        },
   status: {
  type: DataTypes.ENUM("active", "inactive", "maintainance") // or "maintenance" if you fixed the spelling
}
    }
    )
    return department
}
module.exports=createDepartmentAdd
const makeStudentAdd = (sequelize, DataTypes) => {
    const student = sequelize.define("students", {
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
            
        },
        email: {
            type: DataTypes.STRING,
        
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
          
        },
        birth: {
            type: DataTypes.DATEONLY,
        },
        gender: {
            type: DataTypes.ENUM("female", "male", "others"),
         
        },
        address: {
            type: DataTypes.STRING
        },
        studentid: {
            type: DataTypes.STRING,
            unique: true
        },
        course: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.ENUM("first year", "second year", "third year", "fourth year"),
            
        },
        semester: {
            type: DataTypes.ENUM("first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"),
        
        },
        image:{
            type: DataTypes.STRING,
        }
    });

    // Add hook to generate student ID before creation
    student.beforeValidate(async (student, options) => {
        if (!student.studentid) {
            let unique = false;
            let generatedId;
            
            // Keep generating until we get a unique ID
            while (!unique) {
                const timestamp = Date.now().toString().slice(-4);
                const randomNum = Math.floor(1000 + Math.random() * 9000);
                generatedId = `STU-${timestamp}-${randomNum}`;
                
                const existing = await student.constructor.findOne({
                    where: { studentid: generatedId }
                });
                
                if (!existing) {
                    unique = true;
                }
            }
            
            student.studentid = generatedId;
        }
    });

    return student;
};

module.exports = makeStudentAdd;
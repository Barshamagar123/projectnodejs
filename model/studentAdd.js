const makeStudentAdd = (sequelize, DataTypes) => {
    const student = sequelize.define("student", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM("female", "male", "others"),
            allowNull: false
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
            allowNull: false
        },
        year: {
            type: DataTypes.ENUM("first year", "second year", "third year", "fourth year"),
            allowNull: false
        },
        semester: {
            type: DataTypes.ENUM("first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"),
            allowNull: false
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
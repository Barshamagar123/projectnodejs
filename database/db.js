const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize({
    database: process.env.database,
    username: process.env.username,
    password: process.env.password,
    host: process.env.host,
    port:process.env.port,
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => {
        console.log("connected successfully");
    })
    .catch((err) => {
        console.log("error aayo", err);
    });

const db = {};
db.students = require("./../model/studentAdd")(sequelize, DataTypes);
db.departments = require("./../model/departmentAdd")(sequelize, DataTypes);
db.registers = require(".././model/registerMode")(sequelize, DataTypes);
db.gallerys=require(".././model/galleryModel")(sequelize,DataTypes)

// Define associations BEFORE sync
db.registers.hasMany(db.students);
db.students.belongsTo(db.registers);

sequelize.sync({ alter: true }).then(() => {
    console.log("migrated succesfully");
});

module.exports = { db, sequelize };
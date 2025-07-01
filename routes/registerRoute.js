
// const {db, sequelize }=require("./database/db.js")
const {db, sequelize }=require("../database/db.js")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
const { renderRegisterget, renderRegister, renderLoginPage, renderLogin } = require("../controller/registerController")

const router=require("express").Router()
router.route("/register").get(renderRegisterget)
router.route("/register").post(renderRegister)
router.route("/login").get(renderLoginPage)
router.route("/login").post(renderLogin)
module.exports=router
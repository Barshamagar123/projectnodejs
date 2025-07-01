const {multer,storage}=require('../middleware/multerConfig.js')
const {db, sequelize }=require("../database/db.js")
exports.renderGallery=async(request,response)=>{
    const {title,category,date,description}=request.body
 await db.gallerys.create({
    title:title,
    image:process.env.backendUrl + request.file.filename,
    category:category,
    date:date,
    description:description
 })
 response.send("added successfully")
}
exports.renderDisplayGallery=async(request,response)=>{
  const datas= await db.gallerys.findAll()
    response.render("./admindashboard/gallerymgmt/displaygallery.ejs",{images:datas})
}
exports.renderGallerys=async(request,response)=>{
      const datas= await db.gallerys.findAll()
    response.render("./pages/gallery.ejs",{images:datas})
}
exports.renderAddGallery=(request,response)=>{
    response.render("./admindashboard/gallerymgmt/addgalary.ejs")
}
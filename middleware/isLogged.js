const jwt=require("jsonwebtoken")
const isLogged=(request,response,next)=>{
    const token=request.cookies.token
    if(!token){
        response.send("pleased loggedin")
    }
    else{
          jwt.verify(token,"thisisascretkey",(error,result)=>{
            if(error){
                response.send("invalid token")
            }
            else{
                next()
            }
          })
    }
}
module.exports=isLogged
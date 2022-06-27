const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    let token= req.cookies.token;
    jwt.verify(token, "secretkey", (err,decoded)=>{
        if (err) {
            res.status(403).send({success:false, message: "No token"})
        }
        else{
            next()
        }
    })
}
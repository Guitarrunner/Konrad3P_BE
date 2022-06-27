function contentType(req,res,next){
    if (!req.is('application/json')) { 
        res.status(400).send("Content Type error");
    }
    else{
        next()
    } 
    
}

module.exports = contentType
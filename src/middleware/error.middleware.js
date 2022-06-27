function error(err,req,res,next){
    console.log("dsfsd")
    res.status(500).send(err.message);
}

module.exports = error
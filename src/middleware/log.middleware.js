
function log(req,res,next){
    let fs = require('fs')
    let logger = fs.createWriteStream('src/log/callLogs.txt', {
    flags: 'a' 
    })

    logger.write(req.method+"\n") 
    JSON.stringify(req.body)==="{}" ? logger.write('No body\n') : logger.write(JSON.stringify(req.body)+"\n")
    logger.write((new Date()).toUTCString()+"\n")
    logger.write("----------------------------------------------------------\n")
    logger.end()
    next()
}

module.exports = log
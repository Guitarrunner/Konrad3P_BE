const File = require("../models/file.model");
exports.postFile = async(body)=>{
    if (!body) {
      return {status:false, data:"No body"};
    }
    else{
        const file = {
            name: body.name,
            file: body.file
        };
        let response;
        await File.create(file)
          .then(data => {
            response= {status:true, data:data.dataValues};
          })
          .catch(err => {
            response= {status:false, data:err};
          });
          return response;
    }
    
  }
  
  exports.getAll = async() => {
    let response;
    await File.findAll()
        .then(data => {
            response = {status:true, data:data};
        })
        .catch(err => {
            response= {status:false, data:err};
        });
        return response;
}

  exports.getFileById = async(id) => {
    let file;
    await File.findOne({ where: { id:id } })
      .then(data =>{
        file = {status:true, data:data.dataValues}
      })
      .catch(err=>{
        file = {status:false, data:err}
      });
    return file;
  
  }
  
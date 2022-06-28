const listServices = require("../custom/services.json")

function newServices() {
    let services=[];
    listServices.forEach(service =>{
        let num = Math.floor(Math.random() * 7);
        if (num===3){
            services.push(service.name)
        }
    })
    return services
}

module.exports = newServices;
const mongoose = require('mongoose')
const Joi = require('joi')


const vehicleSchema = new mongoose.Schema({
  
    name : {
        type : String,
        required : true,
    },
     size : {
        type : String,
        required : true,
    },
      status : {
        type : String,
        required : true,
    },
    
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

function validateVehicle(vehicle){
    const schema = {
        name : Joi.string().required().min(3).max(250),
        size : Joi.string().required().min(3).max(250),
        status : Joi.string().required().min(3).max(250),
    }

    return Joi.validate(vehicle, schema)
}

module.exports.Vehicle = Vehicle
module.exports.validate = validateVehicle 
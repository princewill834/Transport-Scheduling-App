const mongoose = require('mongoose')
const Joi = require('joi')

const driverSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 255,
        minlength : 3
    }
    
})

const Driver = mongoose.model('Driver', driverSchema);

function validateDriver(driver) {
    const schema = {
        name : Joi.string().required().min(3).max(255),
    }

    return Joi.validate(driver, schema )
}


module.exports.Driver = Driver
module.exports.validate = validateDriver
const mongoose = require('mongoose');
const Joi = require('joi');

const scheduleSchema = new mongoose.Schema({
    driver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Driver',
        required : true
    },
      vehicle : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Vehicle',
        required : true
    },
    customer : {
        type : String,
        required : true,
    },
     customerCompany : {
        type : String,
        required : true,
    },

    service : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true 
    },
     endDate : {
        type : Date,
        required : true 
    },

    pickupLocation :{
        type : String,
        required : true
    },

    dropOffLocation : {
        type : String,
        required : true 
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

function validateSchedule(schedule){
    const schema = {
        driver : Joi.string().required(),
        vehicle : Joi.string().required(),
        customer : Joi.string().required().min(3).max(255),
        customerCompany : Joi.string().required().min(3).max(255),
        service : Joi.string().required().min(3).max(255),
        startDate : Joi.date().required(),
        endDate : Joi.date().required(),
        pickupLocation: Joi.string().required().min(3).max(255),
        dropOffLocation: Joi.string().required().min(3).max(255),
    }

    return Joi.validate(schedule, schema)
}

module.exports.Schedule = Schedule
module.exports.validate = validateSchedule
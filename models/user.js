const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const Joi = require('joi')


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 255,
        minlength : 3
    },
     email : {
        type : String,
        required : true,
        maxlength : 255,
        minlength : 3,
        unique :true
    },
      password : {
        type : String,
        required : true,
        maxlength : 1024,
        minlength : 3,
    }

})

userSchema.methods.generateAuthToken = function(){
    
    const token = jwt.sign({_id : this.id},config.get('jwtSecretKey'))
    return token;
}

const User = mongoose.model('User', userSchema);



function validateUser(user) {
    const schema = {
        name : Joi.string().required().min(3).max(255),
        email : Joi.string().required().min(5).max(255).email(),
        password : Joi.string().required().min(5).max(255)
    }

    return Joi.validate(user, schema )
}

module.exports.User = User
module.exports.validate = validateUser
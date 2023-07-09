const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');


router.post('/', async (req, res)=>{


        const {error} = validation (req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({email : req.body.email})
        if(!user) return res.status(400).send('Invalid email or password')

        let validpassword = await bcrypt.compare(req.body.password, user.password)
        if(!validpassword) return res.status(400).send('Invalid email or password')

        const token = user.generateAuthToken();
        res.send(token)

})

function validation(req) {
    const schema = {
        email : Joi.string().required().min(5).max(255).email(),
        password : Joi.string().required().min(5).max(255)
    }

    return Joi.validate(req, schema )
}


module.exports = router
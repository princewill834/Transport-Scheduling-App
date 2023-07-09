const express = require('express')
const router = express.Router()
const {Driver, validate} = require('../models/driver')

router.get('/', async (req, res)=>{
    try { 
        const drivers = await Driver.find()
        res.send(drivers)
    }
    catch(error){
        res.status(500).send('An error occured while fetching data', error)
    }
    
})


router.post('/', async (req, res)=>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let driver = new Driver({
            name : req.body.name   
        })

        await driver.save()
        res.send(driver)
    }
    catch(error){
        res.status(500).send('An error occured while fetching data', error)
    }
   
})

module.exports = router

const express = require('express')
const {Vehicle, validate} = require('../models/vehicle')
const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        const vehicles = await Vehicle.find()
        res.send(vehicles);
    }
    catch(error){
        res.status(500).send('An error occured while fetching data', error)
    }
})


router.post('/', async (req, res)=>{
    try{
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        
        let vehicle = new Vehicle({
            name : req.body.name,
            size : req.body.size,
            status : req.body.status
        })

        vehicle = await vehicle.save()
        res.send(vehicle)
    }
    catch(error){
        res.status(500).send('Internal server error', error)
    }
})

module.exports = router
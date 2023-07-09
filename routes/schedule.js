const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const {Schedule, validate} = require('../models/schedule')


router.get('/vehicle/:vehicleId', auth, async (req, res)=>{

    try{

        const {vehicleId} = req.params;
        const selectedStartDate = new Date();

        //Calculate the end date by adding 6 days to the start date
        const selectedEndDate = new Date(selectedStartDate)
        selectedEndDate.setDate(selectedStartDate.getDate() + 6)

        //Set the time range for the week from the start to end of the week
        const startOfWeek = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(),
        selectedStartDate.getDate(), 0,0,0);

        const endOfWeek = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(),
        selectedEndDate.getDate(), 23,59,59)

        //Find the schedules within  the specified week
        const schedule = await Schedule.find({vehicle:vehicleId, startDate : {$gte : startOfWeek, $lte :endOfWeek}})
                        .populate('driver', '-_id').populate('vehicle', '-_id')
                        .select('customer customerCompany startDate endDate')
        
        if(!schedule) return res.status(404).send('vehicle with the given Id not found')

        res.send(schedule)
    }

    catch(error){
        res.status(500).send('An error occured while fetching data', error)
    } 

})

router.get('/:id', auth, async(req, res)=>{
    try{
        const schedule = await Schedule.findById(req.params.id)
                        .populate('driver', '-_id')
                        .populate('vehicle','-_id')

        if(!schedule) return res.status(404).send('Schedule with the given Id not found')
        res.send(schedule)
    }

   catch(error){
        res.status(500).send('An error occured while fetching data', error)
    }
})

router.post('/', async (req, res)=>{
    try{
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let schedule = new Schedule({
            driver : req.body.driver,
            vehicle : req.body.vehicle,
            customer : req.body.customer,
            customerCompany : req.body.customerCompany,
            service : req.body.service,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            pickupLocation: req.body.pickupLocation,
            dropOffLocation: req.body.dropOffLocation,
        })

        schedule = await schedule.save()
        res.send(schedule)
    }

     catch(error){
        res.status(500).send('internal server error', error)
    }
})
module.exports = router
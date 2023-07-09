const config = require('config')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const driverRouter = require('./routes/driver');
const vehicleRouter = require('./routes/vehicle');
const scheduleRouter = require('./routes/schedule');
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login') 


app.use(express.json());
app.use('/api/drivers', driverRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);

if(!config.get('jwtSecretKey')){
    console.log('FATAL ERROR: jwtSecretKey is not defined.');
    process.exit(1);
}


mongoose.connect('mongodb://127.0.0.1/scheduling-app',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    })
        .then(()=>console.log('Connected to MongoDB'))
        .catch((error)=>console.error('Error connecting to MongoDB', error))

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Server started on port ${port}`))



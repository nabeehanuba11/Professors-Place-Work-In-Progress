//start express 
const express = require('express')
//get the database from db.js under the config folder
const connectDB = require('./config/db')
const app = express()
const cors = require('cors')

//connect the database
connectDB(); 

app.use(express.json({extended:false}))
app.use(cors())
//send welcome to localhost:4000/
app.get('/', (req,res)=>res.send("Welcome"))

//from the router - users.js file for registration
app.use('/api/register', require('./routes/users'))

//from the router - auth.js file for login
app.use('/api/login', require('./routes/auth'))

//from the router - profile.js file for profile
app.use('/api/profile', require('./routes/profile'))

//from the router - curriculum.js file for profile
app.use('/api/curriculum', require('./routes/curriculum'))


const PORT = process.env.PORT || 4000

//make the app listen to the port 4000 - used to launch app
app.listen(PORT, ()=>console.log("Server running"))


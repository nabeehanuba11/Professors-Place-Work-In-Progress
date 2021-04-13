const mongoose = require('mongoose')
const config = require('config')
//got the mongoURI from default.json...make sure the file name is default.json

const db = config.get('mongoURI')
//connect the mongodb database
const connectDB = async () =>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("database connected")
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }

}
module.exports= connectDB;
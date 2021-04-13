const mongoose = require('mongoose')

const CurriculumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    curr:{
        type: String,
        required: true,
    },
    professor: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('curriculum', CurriculumSchema)
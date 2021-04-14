const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'curriculums'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    content:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comment', CommentSchema)
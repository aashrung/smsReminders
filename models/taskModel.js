'use strict'
const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String
    },
    sentDate: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    sentTime: {
        type: String,
    },
    sentTo: {
        type: String,
    }
}, { timestamps: true })


taskSchema.set('collection', 'Tasks')
module.exports = mongoose.model("Tasks", taskSchema)
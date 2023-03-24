const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title : {type : String, required : true, min : 5},
    description : {type : String, required : true, min : 20},
    location : {type : String, required : true},
    startTime : {type : String, required : true},
    endTime : {type : String, required : true}
})

const eventModel = mongoose.model('Event', eventSchema)

module.exports = eventModel
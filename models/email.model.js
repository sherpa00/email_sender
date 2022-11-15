const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    }
});

const emailModel = mongoose.model("emails",emailSchema);

module.exports = emailModel;
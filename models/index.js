const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/emailsender",(err) => {
    if (!err) {
        console.log("Database emailsender is connected");
    }
})


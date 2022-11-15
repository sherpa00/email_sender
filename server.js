const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const connection = require("./models/index");
const sendRouter = require("./controllers/send");
const emailModel = require("./models/email.model")

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine","ejs");

app.get("/",(req,res) => {
    emailModel.find({},(err,docs) => {
        if (!err) {
            res.render("index",{emails : docs})
        } else {
            console.log(err);
        }
    })
});

app.post("/remove/:id",(req,res) => {
    let verify = mongoose.Types.ObjectId.isValid(req.params.id);

    if (verify) {
        emailModel.findByIdAndRemove(req.params.id,(err) => {
            if (!err) {
                console.log("Record Deleted");
                res.redirect("/");
            } else {
                console.log(err);
            }
        })
    } else {
        console.log("Sorry the id is wrong");
    }
})

app.use("/send",sendRouter);

app.listen(3001,() => {
    console.log("Server is listening at 3001...");
});


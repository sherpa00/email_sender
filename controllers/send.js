const { text } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const emailModel = require("../models/email.model");


router.get("/",(req,res) => {
    res.render("send");
});

router.post("/",(req,res) => {
    let {from,to,subject,email_text} = req.body;

    // insert record to docs
    let newEmailModel = new emailModel({
        from: from,
        to: to,
        subject: subject,
        text: email_text
    });

    newEmailModel.save((err,docs) => {
        if (!err) {
            console.log("Record Saved");
            sendNodeMailer(from,to,subject,email_text).catch(console.error);
            res.redirect("/");
        } else {
            console.log(err);
        }
    })
})

// function to send the email using the nodemailer library
const sendNodeMailer = async (from,to,subject,text) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'joseph62@ethereal.email',
            pass: '2dh8v1DaCayAyH8Hkv'
        }
    });

    // send mail with the defined transport object
    let info = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: ""
    })

    console.log("Message sent %s",info.messageId);

    console.log("Prrview URL: %s",
    nodemailer.getTestMessageUrl(info));
}

module.exports = router;
'use strict';

const nodemailer = require('nodemailer');
const config = require('../config/config2');
//create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: config.senderemail.service,
	secure: false,
	auth: {
	  user: config.senderemail.email,
	  pass: config.senderemail.password,
	},
});

module.exports = {
	sendNewUserEmail(emails, subject, text, html){
	    // setup email data with unicode symbols
	    let mailOptions = {
	        from: config.senderemail.email, // sender address
	        to: emails, // list of receivers
	        subject: subject, // Subject line
	        text: text, // plain text body
	        html: html // html body
	    };

	    // send mail with defined transport object
	    transporter.sendMail(mailOptions, (error, info) => {
	        if (error) {
	            return console.log(error);
	        }
	        console.log('Message sent: %s', info.messageId);
	        // Preview only available when sending through an Ethereal account
	        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  },
}

'use strict';

const sendgrid = require('@sendgrid/mail');
const SENDGRID_API_KEY = "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";
sendgrid.setApiKey(SENDGRID_API_KEY);
const config = require('../config/config2');

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
		sendgrid
			.send(mailOptions)
			.then((resp) => {
				console.log('Email sent...');
			})
			.catch((error) => {
				console.error(error);
			});
  },
};

var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    console.log('In ccavRequestHandler=====>');
    console.log(request.body);
    var body = '',
	workingKey = 'B0757E60598DE9B6CFB724211F06C60C',	//Put in the 32-Bit key shared by CCAvenues.
	accessCode = 'AVNS79FH80BC04SNCB',			//Put in the Access Code shared by CCAvenues.
	encRequest = '',
	formbody = '';

  console.log('Before request.on======>');
  //request.on('data', function (data) {
    console.log('Inside request.on======>');
  	body += request.body;
    console.log('body is===> ', body);
  	encRequest = ccav.encrypt(body,workingKey);
    console.log('encRequest====>', encRequest);

  	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
  //});

  //request.on('end', function () {
      //response.writeHeader(200, {"Content-Type": "text/html"});
      response.send(formbody);
      //response.write(formbody);
      //response.end();
  //});
  //return;
};

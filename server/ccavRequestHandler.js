var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    var body = '',
	workingKey = '73103501355D0B296D31E7F6A5BD1081',	//Put in the 32-Bit key shared by CCAvenues.
	accessCode = 'AVTF80FH01CA38FTAC',			//Put in the Access Code shared by CCAvenues.
	encRequest = '',
	formbody = '';

    console.log('Inside request.on======>');
  	body = request.body;
    console.log(body);
    POST =  qs.parse(body);
    console.log(body.merchant_id);
  	encRequest = ccav.encrypt(JSON.stringify(body), workingKey);
    console.log('encRequest====>', encRequest);

    /*
  	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"><input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><button type="submit">Submit</button></form>';
    */

    formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+body.merchant_id+'&encRequest='+encRequest+'&access_code='+accessCode+'&integration_type=iframe_normal"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';

  //request.on('end', function () {
      //response.writeHeader(200, {"Content-Type": "text/html"});


      var encData = {
          encReq: encRequest,
          accessCode: accessCode
      }

      response.send(formbody);
      //response.write(formbody);
      //response.end();
  //});
  //return;
};

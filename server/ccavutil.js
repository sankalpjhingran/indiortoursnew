var crypto = require('crypto');
exports.encrypt = function (plainText, workingKey) {

	/*
	var m = crypto.createHash('md5');

	console.log('m1====> ', m);
	m.update(workingKey);
	console.log('m2====>', m);
	var key = m.digest('binary');
	console.log('key====>', key);
	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
	var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
	console.log('cipher====>', cipher);
	var encoded = cipher.update(plainText,'utf8','hex');
	console.log('encoded=====> ', encoded);
	encoded += cipher.final('hex');
	console.log('encoded final====> ', encoded );
	return encoded;
	*/

		var m = crypto.createHash('md5');
		console.log('m1====> ', m);
    m.update(workingKey);
		console.log('m2====>', m);
    var key = m.digest();
		console.log('key====>', key);
    var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
		console.log('cipher====>', cipher);
    var encoded = cipher.update(plainText, 'utf8', 'hex');
		console.log('encoded=====> ', encoded);
    encoded += cipher.final('hex');
		console.log('encoded final====> ', encoded );
    return encoded;
};


exports.decrypt = function (encText, workingKey) {
    	var m = crypto.createHash('md5');
    	m.update(workingKey)
    	var key = m.digest('binary');
	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
	var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    	var decoded = decipher.update(encText,'hex','utf8');
	decoded += decipher.final('utf8');
    	return decoded;
};

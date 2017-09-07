var DATABASE_NAME = 'test_db';
var DB_USERNAME = 'abc';
var DB_PASSWORD = 'abc@123';

var Sequelize = require('sequelize');
var FS = require('fs');

var sequelize = new Sequelize(
	DATABASE_NAME,
	DB_USERNAME,
	DB_PASSWORD, {
		host:'localhost',
		port:3306,
		dialect:'mysql',
		define: {
			freezeTableName: true
		}
});

//Connect to Database
sequelize.authenticate().then(function (e) {
	if(e) {
		console.log('There is connection ERROR');
	} else {
		console.log('Connection has been established successfully');
	}
});

//Create Table: image

var Image_Store = sequelize.define('image', {
	image_id: {
		type: Sequelize.INTEGER
	},
	image_type: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.BLOB('long')
	},
	image_size: {
		type: Sequelize.INTEGER
	},
	image_name: {
		type: Sequelize.STRING
	}
});

sequelize.sync({
	force: true,
	logging: console.log

}).then(function () {
	console.log('Everything is synced');

	//Give any image name here.
	var imageData = FS.readFileSync(__dirname + '/123_icon.png');

	Image_Store.create({
		image_id: 123,
		image_type: 'png',
		image: imageData,
		image_size: 3,
		image_name: 'FileName'
	}).then(function (image_store) {
		try {
			//console.log(image_store.image)
			FS.writeFileSync(__dirname + '/target.png', image_store.image);
		} catch (e) {
			console.log(e+'');
		}
	});
});

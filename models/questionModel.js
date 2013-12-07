'use strict';

var mongoose = require('mongoose');

var mapPhotoModel = function(){
	var questionSchema = mongoose.Schema({
		type: String,
		photo: [String],
		dummyPhoto: [String],
		geometry: {
			x: Number,
			y: Number
		}
	});

	return mongoose.model('Question', questionSchema);
};

module.exports = new mapPhotoModel();
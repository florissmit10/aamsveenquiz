'use strict';

var mongoose = require('mongoose');

var mapPhotoModel = function(){
	var mapPhotoQuestionSchema = mongoose.Schema({
		type: String,
		photo: [String],
		geometry: {
			x: Number,
			y: Number
		}
	});

	return mongoose.model('MapPhotoQuestion', mapPhotoQuestionSchema);
};

module.exports = new mapPhotoModel();
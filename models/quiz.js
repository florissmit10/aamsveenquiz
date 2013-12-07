'use strict';

var mongoose = require('mongoose');


var quizModel = function () {

	var quizSchema = mongoose.Schema({
		name: String,
		difficulty: Boolean,
		state: [{id:Number,correct:Boolean}]
	});

	return mongoose.model('Quiz', quizSchema);
};

module.exports = new quizModel();
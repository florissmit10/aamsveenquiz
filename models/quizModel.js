'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
Question = require('./../models/questionModel.js'),
questionSchema = mongoose.model('Question').schema;

var quizModel = function () {

	var quizSchema = Schema({
		uname: String,
		difficulty: Boolean,
		questions: [questionSchema],
		answers: [Boolean]
	});

	quizSchema.methods.populateState = function (){
		var self=this;
		Question.find(function(err,docs){
			if(err) { console.log(err);} 
			while(docs.length>0){
				var docindex = Math.floor(Math.random()*docs.length);
				self.questions.push(docs[docindex]);
				self.answers.push(null);
				docs.splice(docindex,1);
			}
			self.save(function(err,qs){
				if(err){ console.log(err);}
			});
		});

	};

	return mongoose.model('Quiz', quizSchema);
};

module.exports = new quizModel();


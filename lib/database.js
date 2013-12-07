'use strict';

var mongoose = require('mongoose');
var fs = require('fs');
var Question = require('./../models/questionModel.js');

var db = function () {
	return {
		config: function (conf) {
			mongoose.connect('mongodb://' + conf.host + '/' + conf.database);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('db connection open');

				Question.count(function(err,count){
					if(err||count===0){	insert_questions(); }
				});

			});
		}
	};
};

function insert_questions(){
		var qs = fs.readFile(__dirname+'/../data/toerist.json',function(err, data){
			if(err) {throw err;}
			
			var features = JSON.parse(data).features;
			
			if(!features) {throw new Error('data not found!');}
			console.log('Creating questions');
			for(var i =0;i<features.length;i++){
				var o = features[i];
				var photos = o.attributes.photo.split(' and ');
				var newQ = new Question({type:o.attributes.FIELD1 , photo: photos ,geometry: o.geometry});
				newQ.save();
			}
			console.log( 'inserted ' + features.length+ ' questions');
		});
	}

module.exports = db();
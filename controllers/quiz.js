'use strict';
var Quiz = require('./../models/quizModel.js');

module.exports = function (server) {

    server.get('/quiz', function (req, res) {
        if(req.session.quiz!==undefined){
			QuizModel.findById(req.session.quiz,function(err,q){
				if(err) { console.log(err);}
				console.log(q);
			});
		}
		res.redirect('/');
    });

    server.post('/quiz', function (req, res){
			var nm = req.body.uname && req.body.uname.trim();
			var diff = req.body.difficulty=='Hard';
			var quiz = new Quiz({uname:nm,difficulty:diff,state:[]});			
			quiz.save(function(err,q){
				if(err) { console.log(err);}
				req.session.quiz=q.id;			
				quiz.populateState();
			});
			res.redirect('/quiz');
    });

};

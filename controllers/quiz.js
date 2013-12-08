'use strict';
var Quiz = require('./../models/quizModel.js');
var Question = require('./../models/questionModel.js');
var _ = require('underscore');

module.exports = function (server) {

    server.get('/quiz', function (req, res) {
		console.log('received request');
        if(req.session.quiz!==undefined){
			Quiz.findById(req.session.quiz,function(err,qz){
				if(err) { console.log(err);}
				var qIndex;
				var nextQ;
				for(var i=0;i<qz.answers.length;i++){
					if(qz.answers[i]===null){
						nextQ = qz.questions[i];
						qIndex=i;
						break;	
					}
				}
				var model = {next_question: {mCoords:null,photos:[],difficulty:null}, quiz:null};
				if(nextQ!==null&&nextQ!==undefined){
					//questions left
					//handle previous answer
					var qAnswer = req.query.answer;
					if(qAnswer!==null&&qAnswer!==undefined){
						console.log('qAnswer',qAnswer);
						console.log('nextQ.photo',nextQ.photo)
						qz.answers.set(qIndex, nextQ.photo.indexOf(qAnswer)>=0);
						qz.save(function(err){
							if(err){console.log(err)};
							res.redirect('/quiz');
						});
					} else {
						var dummyphotos=[];	
						Question.find(function(err,qs){
							if(err){console.log(err);}
							for(var i=0;i<qs.length;i++){
								dummyphotos=dummyphotos.concat(qs[i].photo);
							}
							while((nextQ.photo.length + nextQ.dummyPhoto.length) < 4){
								var nIdx = Math.floor(Math.random()*dummyphotos.length);
								if(nextQ.photo.indexOf(dummyphotos[nIdx])===-1){
									nextQ.dummyPhoto.push(dummyphotos[nIdx]);
									dummyphotos.splice(nIdx,1);
								}
							}
							nextQ.save(function(err,qqq){
								if(err){console.log(err);}
								model.next_question.mCoords={y:nextQ.geometry.y, x:nextQ.geometry.x};
								model.next_question.photos = _.shuffle(nextQ.dummyPhoto.concat(nextQ.photo));
								model.next_question.difficulty = qz.difficulty?'true':'false';
								qz.questions.set(qIndex,nextQ);
								qz.save(function(err){
									if(err){console.log(err)};
									console.log(nextQ);
									res.render('quiz',model);
								});							
							});
						});
					}
				}else{
					console.log('quiz finished! sending final ');
					var sc=0;
					for(var x=0;x<qz.answers.length;x++){
						if(qz.answers[x])
							sc++;
					}

					model.quiz={
						result: qz.answers,
						score: ""+sc,
						max: qz.answers.length 
					};
					console.log('model result: ',model.quiz.result );
					console.log('model score: ',model.quiz.score );
					res.render('quiz',model);
				}


			});
		}else{
			console.log("->redirecting | no data submited to start quiz. ")
			res.redirect('/');
		}
    });

    server.post('/quiz', function (req, res){
			var nm = req.body.uname && req.body.uname.trim();
			var diff = req.body.difficulty=='Hard';
			var quiz = new Quiz({uname:nm,difficulty:diff,questions: [],awnsers: []});			
			quiz.save(function(err,q){
				if(err) { console.log(err);}
				req.session.quiz=q.id;			
				quiz.populateState();
				res.redirect('/quiz');
			});
		});
};

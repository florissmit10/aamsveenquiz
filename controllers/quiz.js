'use strict';


module.exports = function (server) {

    server.get('/quiz', function (req, res) {
        var model = { name: 'aamsveenwachter' };
        console.log(req);
        if(res.session.state===undefined){
			var name = req.body.name && req.body.name.trim();
			var difficulty = req.body.difficulty==="Hard";
			res.session.name = name;
			res.session.difficulty = difficulty;

		}


        res.render('quiz', model);
        
    });

};

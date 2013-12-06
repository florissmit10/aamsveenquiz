'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'aamsveenquiz' };
        
        res.render('index', model);
        
    });

};

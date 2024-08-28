var server = require('../../node_modules/server'),
    path = require('path');

server.start(8080, path.join(__dirname, '../../'));

server.get('/rest', function (req, res) {
    res.json({
        hello: 'Hello, World!'
    });
});

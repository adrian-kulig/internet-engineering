const initSocketServer = function (app) {
    const http = require('http').Server(app);
    const io = require('socket.io')(http);

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });


    io.emit('some event', {for: 'everyone'});


    io.on('connection', function (socket) {
        socket.broadcast.emit('hi');
    });
    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });
    });


    io.on('connection', function (socket) {
        socket.on('offer edit', function (msg) {
            io.emit('ktos dodal oferte!', msg);
        })
    });

    return http.listen(3000, function () {
        console.log('listening on *:3000');
    });

};

module.exports = {
    initSocketServer
};



const initSocketServer = function (app) {
    const http = require('http').Server(app);
    const io = require('socket.io')(http);



    io.on('connection', function (socket) {


        socket.on('new-message', (message,user) => {
            console.log(message,user);
        });

    });



    return http.listen(3000, function () {
        console.log('listening on *:3000');
    });

};

module.exports = {
    initSocketServer
};



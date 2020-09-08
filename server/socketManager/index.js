module.exports = (io) =>
    io.on('connection', (socket) => {
        console.log('socket connected...' + socket.id);
        socket.on('NEW_POST', (data) => {
            io.emit(`NEW_POST`, data);
        });
    });

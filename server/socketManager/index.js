module.exports = (io) =>
    io.on('connection', (socket) => {
        console.log('socket connected...' + socket.id);
        socket.on('NEW_POST', (data) => {
            io.emit(`NEW_POST`, data);
        });

        socket.on('JOIN_COMMENT', (room) => {
            socket.join(room);
        });

        socket.on('NEW_COMMENT', (data) => {
            const room = data.postId;
            //io.sockets.in(room).emit('NEW_COMMENT', data);
            socket.broadcast.to(room).emit('NEW_COMMENT', data);
        });
    });

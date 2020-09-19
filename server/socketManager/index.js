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
            socket.broadcast.to(room).emit('NEW_COMMENT', data);
        });

        socket.on('COMMENT_DELETED', ({ commentId, room }) => {
            socket.broadcast.to(room).emit('COMMENT_DELETED', commentId);
        });
    });

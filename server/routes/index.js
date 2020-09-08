const postsRoutes = require('./posts.routes');
const commentsRoutes = require('./comments.routes');

function Router(server) {
    server.use(`/api/posts`, postsRoutes);
    server.use(`/api/comments`, commentsRoutes);
}

module.exports = Router;

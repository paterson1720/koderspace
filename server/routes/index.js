const postsRoutes = require('./posts.routes');

function Router(server) {
    server.use(`/api/posts`, postsRoutes);
}

module.exports = Router;

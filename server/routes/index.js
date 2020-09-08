const postsRoutes = require('./posts.routes');

const { BASE_API_URL } = process.env;

function Router(server) {
    server.use(`${BASE_API_URL}/posts`, postsRoutes);
}

module.exports = Router;

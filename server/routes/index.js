const postsRoutes = require('./posts.routes');
const commentsRoutes = require('./comments.routes');
const authRoutes = require('./auth.routes');
const uploadRoutes = require('./upload.routes');

function Router(app) {
    app.use('/api/posts', postsRoutes);
    app.use('/api/comments', commentsRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/upload', uploadRoutes);
}

module.exports = Router;

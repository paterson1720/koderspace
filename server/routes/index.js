const postsRoutes = require('./posts.routes');
const commentsRoutes = require('./comments.routes');
const authRoutes = require('./auth.routes');
const uploadRoutes = require('./upload.routes');
const usersRoutes = require('./users.routes');
const bookmarksRoutes = require('./bookmarks.routes');
const { ensureAuthentication } = require('../auth/authenticationConfig');

function router(app) {
  app.use('/api/users', usersRoutes);
  app.use('/api/posts', postsRoutes);
  app.use('/api/comments', commentsRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/bookmarks', bookmarksRoutes);
}

function handlePagesRoutes(app, nextApp) {
  const handle = nextApp.getRequestHandler();
  app.get('/', (req, res) => nextApp.render(req, res, '/index', req.query));
  app.get('/bookmarks', ensureAuthentication, (req, res) =>
    nextApp.render(req, res, '/bookmarks', req.query)
  );
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  app.all('*', (req, res) => handle(req, res));
}

module.exports = { router, handlePagesRoutes };

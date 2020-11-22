require('dotenv').config();
const app = require('express')();
const next = require('next');
const { urlencoded, json } = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const { router, handlePagesRoutes } = require('./routes');
const connectToDatabase = require('./config/databaseConnection');
const initializeSocket = require('./socketManager');
const { initializeAuthentication } = require('./auth/authenticationConfig');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });

initializeSocket(io);

nextApp.prepare().then(() => {
  app.use(json());
  app.use(urlencoded({ extended: false }));

  initializeAuthentication(app);
  router(app);
  connectToDatabase();
  handlePagesRoutes(app, nextApp);

  const port = parseInt(process.env.PORT, 10) || 3030;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready to serve on PORT: ${port}`);
  });
});

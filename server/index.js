require('dotenv').config();
const app = require('express')();
const next = require('next');
const { urlencoded, json } = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const router = require('./routes');
const connectToDatabase = require('./config/databaseConnection');
const initializeSocket = require('./socketManager');
const { initializeAuthentication } = require('./auth/authenticationConfig');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

initializeSocket(io);

nextApp.prepare().then(() => {
    app.use(json());
    app.use(urlencoded({ extended: false }));
    initializeAuthentication(app);

    router(app);
    connectToDatabase();

    app.get('/', (req, res) => {
        return nextApp.render(req, res, '/index', req.query);
    });
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    app.all('*', (req, res) => handle(req, res));

    const port = parseInt(process.env.PORT, 10) || 3030;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready to serve on PORT: ${port}`);
    });
});

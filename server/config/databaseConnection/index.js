const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const MONGODB_URI = dev ? process.env.MONGODB_DEV_URI : process.env.MONGODB_PROD_URI;

module.exports = () =>
    mongoose
        .connect(MONGODB_URI, { useNewUrlParser: true })
        .then(() => {
            console.log(`Connected to the ${dev ? 'local' : 'Atlas'} database`);
        })
        .catch((e) => console.error('Could not connect to the database', e));

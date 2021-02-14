const mongoose = require('mongoose');
require('dotenv').config();
const db_dev = process.env.DB_DEV;

mongoose.connect(db_dev, { useNewUrlParser: true, useUnifiedTopology: true }).catch(e => {
    console.error('Connection error', e.message)
});

const db = mongoose.connection;

module.exports = db;
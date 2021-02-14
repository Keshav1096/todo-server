//Initialising
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db')
const userRouter = require('./routes/user-router');
const taskRouter = require('./routes/task-router');
require('dotenv').config();

const app = express();

//Setting port from .env file
const port = process.env.PORT || 3010;

//Set up mongoose

//Middlewares
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Server up and running!");
});

//db connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

//Listening to port
app.listen(port, (err, res) => {
    console.log(`Server listening on port ${port}`);
});
// library
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();


// connect mongodb
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

if (!db) {
    console.log('Error Connection db!');
} else {
    console.log('Db connected successfully');
}

// to send body 
app.use(bodyParser.json())

// Router default
app.get('/', (req, res) => res.status(200).send({
    status_code: 200,
    status_message: "Welcome at endpoint library"
}));


// Router Middleware
app.use('/api', require('./routers/api'));

app.get('*', (req, res) => {
    res.json({
        status_code: 404,
        status_message: 'Page Not Found!'
    }, 404)
});

// port
const port = process.env.port || 3000;

// listen for request
app.listen(port, () => {
    console.log(`Running RestApi on port http://localhost:${port}`);
})
// library
const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// 

const multer = require("multer");
const path = require("path");

// storage engine 

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
})


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

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Router Middleware
// app.use('/images', express.static('upload/images'));
app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routers/api'));

// port
const port = process.env.port || 3000;

// listen for request
app.listen(port, () => {
    console.log(`Running RestApi on port http://localhost:${port}`);
})
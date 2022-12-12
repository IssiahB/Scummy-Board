require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

// Access configurations based on environment
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const {
    accessRoutes,
    scumRoutes
} = require('./routes/index');

const app = express();

// Sessions
const MongoStore = require('connect-mongo');
const passport = require('passport');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.database.url
    })
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Routing
app.use('/access', accessRoutes);
app.use('/scum', scumRoutes);

// Database Connection
const mongoUrl = config.database.url;
mongoose.connect(mongoUrl, (err) => {
    if (err)
        console.log('Error connecting to database!');
    else
        console.log('Database connected successfully!');
});

module.exports = {app, config};
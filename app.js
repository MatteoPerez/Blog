// This code sets up and runs the web application using Express.js.

// Load environment variables from a .env file
require('dotenv').config();

// Express and Middleware setup
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

const { isActiveRoute } = require('./server/helpers/routeHelper');
const loginMiddleware = require('./server/helpers/loginMiddleware');

app.locals.isActiveRoute = isActiveRoute;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));
app.use(loginMiddleware);

// Set the folder for static files
app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Define the main route for the application
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
app.use('/files', require('./server/routes/files'));

connectDB();

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

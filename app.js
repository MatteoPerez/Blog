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
const multer = require('multer');

const app = express();
const PORT = 5000 || process.env.PORT;

const {isActiveRoute} = require('./server/helpers/routeHelper');
const loginMiddleware = require('./server/helpers/loginMiddleware');

// Connect to database
const connectDB = require('./server/config/db');
connectDB();

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

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const path = require('path');

/*
 * Creates an Express application
 */
const app = express();

/*
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use('/public', express.static(path.resolve(__dirname, '..', 'public')));
app.use(routes);

/*
 * Views
 */

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

/*
 * Start the application
 */
app.listen(3001);

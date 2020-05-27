const routes = require('express').Router();
const PostController = require('./controllers/PostController');
const multerConfig = require('./middlewares/multer');

// Create post
routes.get('/posts/new', PostController.create);

// Save post to table
routes.post('/posts/new', multerConfig.single('file'), PostController.store);

// Listing of posts
routes.get('/posts', PostController.show);

// Delete post
routes.get('/posts/:id', PostController.destroy);

module.exports = routes;

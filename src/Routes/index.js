const express = require('express');
const category = require('./category');
const product = require('./product');

const Router = express.Router();

Router.use('/category', category);
Router.use('/product', product);

module.exports = Router;
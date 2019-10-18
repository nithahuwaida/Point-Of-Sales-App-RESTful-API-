const express = require('express');
const categoryController = require('../Controllers/category');
const Router = express.Router();


Router.get('/', categoryController.getCategories);
Router.post('/', categoryController.postCategories);
Router.put('/:keyid', categoryController.updateCategories);
Router.delete('/:keyid', categoryController.deleteCategories);

module.exports = Router;
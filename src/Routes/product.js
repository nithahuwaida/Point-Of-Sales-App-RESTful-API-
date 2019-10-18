const express = require('express');
const productController = require('../Controllers/product');
const Router = express.Router();


Router.get('/', productController.getProducts);
Router.post('/', productController.postProducts);
Router.get('/sort', productController.sortProducts);
Router.get('/page', productController.pageProducts);
Router.get('/search', productController.searchProducts);
Router.get('/:keyId', productController.getProductsId);
// Router.patch('/:keyId', productController.updateProducts);
Router.put('/:keyId', productController.updateProducts);
Router.delete('/:keyId', productController.deleteProducts);
Router.put('/qty/add/:keyId', productController.addQty);
Router.put('/qty/reduce/:keyId', productController.reduceQty);

module.exports = Router;
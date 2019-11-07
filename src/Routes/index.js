const express = require('express');
const category = require('./category');
// const product = require('./product');
const transaction = require('./transaction');
const user = require('./user');
const userController = require('../Controllers/user'),
	product = require('./product'),
    {validateUser} = require('../Middleware/verifyToken');


const Router = express.Router();
Router.get('/',(req,res)=> {
    res.json({
        message: "Welcome to Point of Sale",
        login: "If you already have an account, please login",
        register: "Register your account today to use Point of Sale"
    })
})
.post('/register', userController.registerUser)
.post('/login', userController.loginUser);

Router.use('/categories',validateUser,category);
Router.use('/products', validateUser, product);
Router.use('/transactions',validateUser,transaction);
Router.use('/users',validateUser,user)

module.exports = Router;
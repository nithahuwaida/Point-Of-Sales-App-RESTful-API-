const express = require('express');
const userController = require('../Controllers/user.js');
const Router = express.Router();

Router.get('/', userController.getUsers);

module.exports = Router;
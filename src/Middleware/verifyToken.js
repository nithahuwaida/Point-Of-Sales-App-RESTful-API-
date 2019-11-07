const form = require('../Helpers/form');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || '111197';

exports.validateUser = (req, res, next) => {
    // console.log(req.headers['x-access-token'], secretKey)
	jwt.verify(req.headers['x-access-token'], secretKey,
	(err, decoded) => {
        if (err) {
            return res.status(400).send({
                status: 400,
                message :"Invalid Token!"
            })
        } else {
            req.body.user_id = decoded.id;
            req.body.username = decoded.username;
            next();
        }
    });
}
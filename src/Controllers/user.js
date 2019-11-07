const userModel = require('../Models/user');
const form = require('../Helpers/form');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.SECRET_KEY || '270400';
const verifyToken= require('../Middleware/verifyToken')


module.exports = {
    getUsers:(req, res)=>{
        userModel
        .getUsers()
        .then((response)=>{
            form.success(res, response)
        })
        .catch((err)=>{
            res.json(err)
        });
    },
    registerUser:(req,res)=>{

        const isPasswordValid = password => {
            const tester = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            return password.match(tester) == null ? false : true;
        };

        const isUsernameValid = username => {
            const tester = /[_]*(?!.*\W).{6,}/;
            return username.match(tester) == null ? false : true;
        };

        if (req.body.username == null) {
            return res.status(400).send({
                status: 400,
                message :"Username can't be empty!"
            })
        }
        if (req.body.password == null) {
            return res.status(400).send({
                status: 400,
                message :"Password can't be empty!"
            })
        }
        if(!isUsernameValid(req.body.username)){
            return res.status(400).send({
                status: 400,
                message :"username cannot contain special character except underscore ( _ ) and minimal 6 digits!"
            })
        }
        if(!isPasswordValid(req.body.password)){
            return res.status(400).send({
                status: 400,
                message :"Password must have lower case, upper case, number, and minimal 8 digits"
            })
        } 

        //hash the password
        const salt= bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const data = {
            username: req.body.username,
            email : req.body.email,
            password : hashedPassword
            // password : req.body.password
        }
    
        //Check username or email already exist
        userModel.registerCheck(data)
        .then(response =>{
            if(response.length === 0){
                //Register the user
                return userModel.registerUser(data)
                .then(response => res.json({
                    status:200,
                    message  : 'The user is successfully registered!',
                    user: {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                      }
                }))
                .catch(err => console.log(err))
            }else{
                return res.status(400).send({
                    status: 400,
                    message :'Username or Email already registered!'
                })
            }
        })
    },
    loginUser: (req, res) => {
        if (req.body.username == null){
            return res.status(400).send({
                status: 400,
                message :"Username can't be empty"
            })
        }
        if (req.body.password == null){
            return res.status(400).send({
                status: 400,
                message :"Password can't be empty"
            })
        }

        const data = {
          username: req.body.username,
          password: req.body.password
        }
        userModel.loginUser(data)
        .then(response => {
        console.log(response.length)
            if (response.length != 0) {
                const validPassword = req.body.password
                // console.log(bcrypt.compareSync(req.body.password, response[0].password))
                console.log(req.body.password)
                console.log(response[0].password)
                if (bcrypt.compareSync(req.body.password, response[0].password)) {
                // if (response[0].password === validPassword) {
                    const token = jwt.sign({
                        id: response[0].id,
                        username: response[0].username
                    }, secretKey, {
                        expiresIn: '1d'
                    });
                    res.send({
                        status : 200,
                        message : 'Login successfully!',
                        result :{
                            id : response[0].id_user,
                            username : response[0].username,
                            password : response[0].password,
                            token : token
                        }
                    })
                } else {
                    return res.status(400).send({
                        status: 400,
                        message :"Password incorrect"
                    })
                }
            } else {
                return res.status(400).send({
                    status: 400,
                    message :"User not found"
                })
            }
        });
    },
}
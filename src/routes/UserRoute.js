const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const middlewares = require('../middlewares')
const UserModel = require('../models/UserModel');

const router = express.Router();


/**
 * Route for User registration
 * @param name: String
 * @param email: String
 * @param password: String
 * @param phone: Number
 */
router.post('/user/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const isUserExists = await UserModel.findOne({email: email});
        if(isUserExists) {
            res.status(409).json({
                status: false,
                msg: `User with email ID ${email} already exists.`
            })
        }else {
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            const user = new UserModel({
                name: name,
                email: email,
                password: hashedPassword,
                createdAt: Date.now().toString()
            })

            let data = await user.save();

            data ? 
                res.status(200).json({
                    status: true,
                    msg: 'registration success'
                })
            :   res.status(400).json({
                    status: false,
                    msg: 'registration failed'
                })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})


/**
 * Route for User Login
 * @param email: String
 * @param password: String
 */
router.post('/user/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await UserModel.findOne({email: email})

        if (user == null || user == undefined) {
            res.status(404).json({
                status: false,
                msg: `User with email ${email} not found.`
            })
        }else {
            if (bcrypt.compareSync(password, user.password)) {
                signiningData = {
                    email: user.email,
                    id: user._id,
                    userType: user.userType
                }
    
                token = jwt.sign(signiningData, process.env.SIGNATURE);
                signiningData['token'] = token;
    
                res.status(200).json({
                    status: true,
                    msg: 'success',
                    token: signiningData
                })
            }else {
                res.status(400).json({
                    status: false,
                    msg: 'Invalid username or password'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})


/**
 * Route for resetting User password
 * @param email: String
 * @param password: String
 */
router.post('/user/reset/password', async (req, res) => {
    try {
       const {email, password} = req.body;
       const user = await UserModel.findOne({email: email});
       if (user) {
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const update = {
                password: hashedPassword
            }

            const data = await UserModel.findOneAndUpdate({email: email}, update);
            data ? 
                res.status(200).json({
                    status: true,
                    msg: 'password reset success'
                })
            :   res.status(400).json({
                    status: false,
                    msg: 'password reset failed'
                })

       }else {
            res.status(404).json({
                status: false,
                msg: `User with email ${email} not found.`
            })
       } 
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})



module.exports = router;
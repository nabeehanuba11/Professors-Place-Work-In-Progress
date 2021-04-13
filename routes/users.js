//user for user routes

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
//after installing express-validator
const{check,validationResult} = require('express-validator/check')

//Database User schema
const UserModel = require('../models/UserModel')

/**registration user route**/

router.post('/', [
    /**validating user responses**/
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password length should be 6 or more characters').isLength({min:6}),

], async (req, res)=>{
    //checking for errors while inputting information
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const{name,email,password} = req.body;
    try{
        let user = await UserModel.findOne({email})
        /**check to see if user already exists using email**/
        if(user){
            return res.status(400).json({msg: "User already exists with Email Provided"});
        }
        /**if new user, save user info**/
        user = new UserModel({
            name,
            email,
            password
        })
        /**password converting into hash format**/
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('SecretKey'),{
            expiresIn: 360000
        }, (err,token)=>{
            if(err) throw err
            res.json({token})
        })
    }catch(error){

    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
//Database User schema
const UserModel = require('../models/UserModel')
//after installing express-validator
const{check,validationResult} = require('express-validator/check')
const auth = require('../middleware/auth')


/**Private route, logged in users can get access it**/


 router.get('/',auth, async(req,res)=>{
    try {
        const user = await(await UserModel.findById(req.user.id).select('-password'));
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('')
    }
})

/**router.get('/', (req,res)=>{
    res.send('Get Logged In user')
})*/

router.post('/', [
    check('email', 'Please Enter Valid Email').isEmail(),
    check('password', "Please enter Password").exists()
], 
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const{email,password} = req.body
    try{
        let user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'User not found with the email'})
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({msg:'Wrong Password'})
        }
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
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports=router
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator/check')
//Database User schema
const UserModel = require('../models/UserModel')
//Database Profile schema
const ProfileModel = require('../models/ProfileModel')
const auth = require('../middleware/auth')
const { update } = require('../models/UserModel')

/**Show Profile */
router.get('/', auth, async (req,res)=>{ 
        try {
            const profile = await ProfileModel.find({user: req.user.id}).sort({date:-1})
            res.json(profile)
        } catch (error) {
            console.log(err.message)
            res.status(500).send('Server Error')
        }
})

/**Save profile */
router.post('/', [auth,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('bio', 'Please enter Bio').not().isEmpty(),
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, phone, bio} = req.body
    try {
       const newProfile = new ProfileModel({
        name,
        email,
        phone,
        bio,
        user: req.user.id
       }) 
       const savedProfile = newProfile.save()
       res.json(savedProfile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

/**Edit profile */
router.put('/:id', auth, async(req,res)=>{
    const {name, email, phone, bio} = req.body
    const empFields = {}
    if(name) empFields.name = name
    if(email) empFields.email = email
    if(phone) empFields.phone = phone
    if(bio) empFields.bio = bio
    try {
        let profile = await ProfileModel.findById(req.params.id)
        if(!profile){
            return res.status(404).json({msg: 'Profile not found'})
        }
        profile = await ProfileModel.findByIdAndUpdate(req.params.id,{
            empFields
        }, {new: true})
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

/**Delete profile */
router.delete('/:id',auth, async (req,res)=>{
    try {
        let profile = await ProfileModel.findById(req.params.id)
        if(!profile){
            return res.status(404).json({msg: 'Profile not found'})
        }
        await ProfileModel.findByIdAndRemove(req.params.id)
        res.json({msg: 'Profile Deleted'})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports=router
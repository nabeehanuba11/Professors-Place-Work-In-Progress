const express = require('express')
const router = express.Router()
const CurriculumModel = require('../models/CurriculumModel')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null, './client/public/uploads/')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

const upload = multer({storage:storage})

//Get all curriculums
router.get('/', (req,res)=>{
    CurriculumModel.find().then(curr => res.json(curr)).catch(err=>res.status(400).json(`Error: ${err}`))
})

//Add new curriculum
router.post('/add', upload.single("image"), (req,res)=>{
    const newCurriculum = new CurriculumModel({
        title: req.body.title,
        curr: req.body.curr,
        professor: req.body.professor,
        image: req.file.originalname
    })
    newCurriculum.save().then(()=>res.json("New Curriculum Added!")).catch(err=>res.status(400).json(`Error: ${err}`))
})

//find curriculum by id
router.get('/:id', (req,res)=>{
    CurriculumModel.findById(req.params.id)
    .then(curr=>res.json(curr)).catch(err=>res.status(400).json(`Error: ${err}`))
})
//find curriculum by id and update
router.put('/update/:id',upload.single("image"),(req,res)=>{
    CurriculumModel.findById(req.params.id)
    .then(curr=>{
        curr.title= req.body.title,
        curr.curr= req.body.curr,
        curr.professor= req.body.professor,
        curr.image = req.file.originalname
        curr.save().then(()=>res.json("The article is updated!")).catch(err=>res.status(400).json(`Error: ${err}`))
    })
    .catch(err=>res.status(400).json(`Error: ${err}`))
})
//find curriculum by id and delete
router.delete('/:id', (req,res)=>{
    CurriculumModel.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Curriculum is deleted")).catch(err=>res.status(400).json(`Error: ${err}`))
})

module.exports=router
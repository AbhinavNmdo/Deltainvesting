const express = require('express');
const Class = require('../models/Class');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

router.get('/allclass', async (req,res)=>{
    let classes = await Class.find();
    res.json(classes);
});

router.get('/singleclass/:id', async (req,res)=>{
    const id = req.params.id;
    const allclass = await Class.findById(id);
    res.json(allclass)
})

router.post('/addclass', (req, res)=>{
    const {name, description, classLink, thumbnail} = req.body;
    try {
        Class.create({
            name,
            description,
            classLink,
            thumbnail
        });
        res.send("Done")
    } catch (error) {
        res.status(500).json({error});
    }
})

module.exports = router;
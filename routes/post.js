const router = require('express').Router();
const verify= require('./verifyToken');


router.get('/',verify , (req,res)=>{
    res.json({
        post:{
            title:'My first post',
            description:'random data access'
        }
    })
})

module.exports= router;

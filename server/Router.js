const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next){
    console.log(res.json({msg:'Server is up and running'}))
   
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next){
    console.log(res.json({msg:'Server is up and running'}));    
    router.get('/allow-cors', function(request, response){
        response.set('Access-Control-Allow-Origin', '*');
    })
    // res.writeHead(200, 'Access-Control-Allow-Origin', 'http://localhost:3000');
//    console.log('Server is up and running');
});

module.exports = router;
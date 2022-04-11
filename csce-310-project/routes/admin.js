var express = require('express');
var router = express.Router();

router.get('/get:id', function(req, res, next){
    const userid = req.params.id
    const adminid = 0
    res.sendStatus(200).send("{$adminId}")
})

router.post('/create', function(req, res, next) {
    const userId = parseInt(req.body.userid)
    const adminId = 0
    res.sendStatus(200).send("Admin {$adminId} created for userid {$userId}")
});

module.exports = router
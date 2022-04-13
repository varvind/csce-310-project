var express = require('express');
var router = express.Router();

router.get('/get/:id', function(req, res, next){
    const userId = req.params.id
    const adminId = 0
    res.status(200).send(`${adminId}`)
})

router.post('/create', function(req, res, next) {
    const { userId } = req.body
    const adminId = 0
    res.status(201).json({ userId: userId, adminId: adminId })
})

router.delete('/delete', function(req, res, next) {
    const { userId } = req.body
    const adminId = 0
    res.status(200).json({ userId: userId, adminId: adminId })
})

module.exports = router
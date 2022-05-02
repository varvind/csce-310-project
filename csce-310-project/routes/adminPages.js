// edited by the best coder in the team: Jakob Evangelista
var express = require('express');
var router = express.Router();

router.get('/get/:userid', function(req, res, next){
    const user_id = req.params.userid
    pool.query("SELECT * FROM admins WHERE user_id=$1", [userId], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Admin does not exist")
        }
        res.json(poolres.rows[0])
    })
})

router.post('/create', function(req, res, next) {
    const user_id = req.body.userid
    pool.query("INSERT INTO admins (user_id) VALUES ($1) RETURNING admin_id, user_id", [userId], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not add admin")
        }
        res.json(poolres.rows[0])
    })
})

router.delete('/delete', function(req, res, next) {
    const user_id = req.body.userid
    pool.query("DELETE FROM admins WHERE user_id=$1", [userId], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete admin")
        }
        res.status(200).send("Admin deleted")
    })
})

module.exports = router
//Developed by Jason Hirsch

var express = require('express');
var router = express.Router();

router.get('/get/:userid', function(req, res, next){
    const user_id = req.params.userid
    pool.query("SELECT * FROM admins WHERE user_id=$1", [user_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Admin does not exist")
            return
        }
        if(poolres.rows[0] == undefined) {
            res.status(400).send("Admin does not exist")
            return
        }
        res.json(poolres.rows[0])
    })
})

router.post('/create', function(req, res, next) {
    const user_id = req.body.user_id
    pool.query("INSERT INTO admins (user_id) VALUES ($1) RETURNING admin_id, user_id", [user_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not add admin")
            return
        }
        res.json(poolres.rows[0])
    })
})

router.delete('/delete/:userid', function(req, res, next) {
    const user_id = req.params.userid
    pool.query("DELETE FROM admins WHERE user_id=$1", [user_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete admin")
            return
        }
        res.status(200).send("Admin deleted")
    })
})

module.exports = router
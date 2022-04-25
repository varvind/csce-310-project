var express = require('express');
var router = express.Router();

router.get("/get/:userid", function(req, res, next) {
    const user_id = req.params.userid
    pool.query("SELECT * FROM page_members WHERE user_id=$1", [user_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Member does not exist for that page")
        }
        res.json(poolres.rows[0])
    })
})

router.post("/add", function(req, res, next) {
    const { page_id, user_id } = req.body
    pool.query("INSERT INTO page_members (page_id, user_id) VALUES ($1, $2)", [page_id, user_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not add page member")
        }
        res.json(poolres.rows[0])
    })
})

router.delete("/delete", function(req, res, next) {
    const { page_id, user_id } = req.body
    pool.query("DELETE FROM page_members page_id=$1 AND user_id=$2", [page_id, user_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete page member")
        }
        res.status(200).send("Page member deleted")
    })
})

module.exports = router
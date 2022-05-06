//Developed by Jason Hirsch

var express = require('express');
var router = express.Router();

router.get("/getadmins/:search", (req, res, next) => {
    const search = req.params.search
    console.log(search)
    pool.query("SELECT * FROM (admins INNER JOIN users ON admins.user_id=users.user_id) WHERE username LIKE '%' || $1 || '%'", [search], (perr, pres) => {
        if(perr) {
            console.log(perr)
            res.status(400).send("Could not search admins")
        }
        res.json(pres.rows)
    })
})

router.get("/get/:page_id", function(req, res, next) {
    const page_id = req.params.page_id
    pool.query("SELECT * FROM ((SELECT * FROM admin_pages WHERE page_id=$1) AS ap INNER JOIN admins ON ap.admin_id=admins.admin_id) AS apa INNER JOIN users ON apa.user_id=users.user_id", [page_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not get page members")
            return
        }
        res.json(poolres.rows)
    })
})

router.post("/add", function(req, res, next) {
    const { page_id, admin_id } = req.body
    pool.query("INSERT INTO admin_pages (admin_id, page_id) VALUES ($1, $2) RETURNING *", [admin_id, page_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not add page member")
            return
        }
        pool.query("UPDATE pages SET member_count=member_count+1 WHERE page_id=$1", [page_id])
        res.json(poolres.rows[0])
    })
})

router.delete("/delete", function(req, res, next) {
    const { page_id, admin_id } = req.body
    pool.query("DELETE FROM admin_pages WHERE page_id=$1 AND admin_id=$2", [page_id, admin_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete page member")
            return
        }
        pool.query("UPDATE pages SET member_count=member_count-1 WHERE page_id=$1", [page_id])
        res.status(200).send("Page member deleted")
    })
})

module.exports = router
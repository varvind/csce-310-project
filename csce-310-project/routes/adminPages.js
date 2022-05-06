// edited by the best coder in the team: Jakob Evangelista
const { query } = require('express');
var express = require('express');
var router = express.Router();

// creates admin page
router.post("/create/:admin_id", (req, res, next) => {
    const {description, member_count, name} = req.body
    pool.query("INSERT INTO pages (admin_id, description, member_count, page_name) VALUES ($1, $2, $3, $4) RETURNING *", [req.params.admin_id, description, member_count, name], (error, results) => {
        if (error) {
            console.log(error)
            res.status(400).send("error creating page")
            next(error)
        }
        
        res.status(201).send(`${results.rows[0]}`)
        
    })
})

// update page
router.post('/update/:page_id', (req, res) => {
    const {name, description, member_count} = req.body
    query1 = 'UPDATE pages SET '
    if(description != null && description != "") {
        query1 += `description = \'${description}\', `
    }
    if(member_count != null && member_count != "") {
      query1 += `member_count = \'${member_count}\', `
    }
    if(name != null && name != "") {
        query1 += `page_name = \'${name}\', `
    }
    query1 = query1.substring(0, query1.length - 2)
    // console.log(query)
    query1 += ` where page_id = ${req.params.page_id}`
    console.log(query1)
    pool.query(query1, (error, result) => {
      if(error) {
        console.log(error)
      }
      res.status(201).send(`Page successfully updated`)
    })
  
})

// deletes admin page
router.delete('/delete/:page_id', function(req, res, next) {
    const page_id = req.params.page_id
    pool.query("DELETE FROM pages WHERE page_id=$1", [page_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete page")
        }
        res.status(200).send("Page deleted")
    })
})

// get all pages from specified admin
router.get('/get/:admin_id', function(req, res, next){
    const admin_id = req.params.admin_id
    pool.query("SELECT page_name, description, member_count, page_id FROM pages WHERE admin_id=$1", [admin_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Page does not exist")
        }
        pages = poolres.rows
        res.status(201).send(pages)
    })
})

module.exports = router
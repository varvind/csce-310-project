// edited by the best coder in the team: Jakob Evangelista
var express = require('express');
var router = express.Router();

// creates admin page
router.post("/create/:admin_id", (req, res, next) => {
    const {description, member_count, name} = req.body
    pool.query("INSERT INTO pages (admin_id, description, member_count, name) VALUES ($1, $2, $3, $4) RETURNING *", [req.params.admin_id, description, member_count, name], (error, results) => {
        if (error) {
            console.log(error)
            res.status(400).send("error creating page")
            next(error)
        }
        // request = result.rows[0]
        // res.status(201).send(`Sucessfully created page for ${result.admin_id} with description ${result.description}`)
        res.status(201).send(`${results.rows[0].page_id}`)
        
    })
})

// update page
router.post('/update/:page_id', (req, res) => {
    const {description, member_count, name} = req.body
    query = 'UPDATE pages SET '
    if(description != null && description != "") {
        query += `description = \'${description}\', `
    }
    if(member_count != null && member_count != "") {
      query += `member_count = \'${member_count}\', `
    }
    if(name != null && name != "") {
        query += `name = \'${name}\', `
    }
    query = query.substring(0, query.length - 2)
    query += ` where page_id = ${req.params.page_id}`
    console.log(query)
    pool.query(query, (error, result) => {
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
    pool.query("SELECT name, description, member_count FROM pages WHERE admin_id=$1", [admin_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Page does not exist")
        }
        pages = poolres.rows
        res.status(201).send(pages)
    })
})

module.exports = router
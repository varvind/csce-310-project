// edited by the best coder in the team: Jakob Evangelista
var express = require('express');
var router = express.Router();

// creates admin page
router.post("/create/:admin_id", (req, res, next) => {
    // Check if anyone is logged in. You should not be able to create a post from a null admin
    if (req.params.admin_id = null) {
        res.status(308).send(`Error admin not logged in`)
    } else {
        const {description, member_count} = req.body
        pool.query("INSERT INTO pages (admin_id, description, member_count) VALUES ($1, $2, $3) RETURNING admin_id, description, member_count", [req.params.admin_id, description, member_count], (error, results) => {
            if (error) {
                console.log(error)
            }

            // request = result.rows[0]
            // res.status(201).send(`Sucessfully created page for ${result.admin_id} with description ${result.description}`)
            res.status(201).send(`${results.rows[0].page_id}`)
            
        })
    }
})

// update page
router.post('/update/:page_id', (req, res) => {
    const {description, member_count} = req.body
    query = 'UPDATE pages SET '
    if(description != null && description != "") {
        query += `description = \'${description}\', `
      }
    if(member_count != null && member_count != "") {
      query += `member_count = \'${member_count}\', `
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

// search page
router.get('/get/:page_id', function(req, res, next){
    const page_id = req.params.page_id
    pool.query("SELECT * FROM pages WHERE page_id=$1", [page_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Page does not exist")
        }
        res.json(poolres.rows[0])
    })
})

module.exports = router
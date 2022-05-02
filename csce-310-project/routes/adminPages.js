// edited by the best coder in the team: Jakob Evangelista
var express = require('express');
var router = express.Router();

// creates admin page
router.post("/create/:userId", (req, res, next) => {
    // Check if anyone is logged in. You should not be able to create a post from a null user.
    if (req.params.userId = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Insert into database
        const {page_id, description} = req.body
        pool.query("INSERT INTO pages (page_id, description, member_count) VALUES ($1, $2, $3) RETURNING *", [req.params.userId, description, member_count], () => {
            if (error) {
                throw error
            }

            request = result.rows[0]
            res.status(201).send(`Sucessfully created page for ${request.user_id} with description ${request.description}`)
        })
    }
})

// update page
router.post('/update/:page_id', (req, res) => {
    const page_id = req.params.page_id
    const description = req.body
    pool.query('UPDATE page SET description = $2 WHERE page_id=$1', (error, result) => {
      if(error) {
        next(error)
      }
      res.status(201).send(`Page successfully updated`)
    })
  
})

// deletes admin page
router.delete('/delete', function(req, res, next) {
    const page_id = req.body.page_id
    pool.query("DELETE FROM pages WHERE page_id=$1", [page_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete page")
        }
        res.status(200).send("Page deleted")
    })
})

module.exports = router
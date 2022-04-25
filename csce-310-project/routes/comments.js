// Joshua Kim
var express = require('express');
var router = express.Router();

/*
*   Functionality: Creating a new post and storing it in the database
*/
router.post("/create/comment/:userId", (req, res, next) => {
    // Check if anyone is logged in
    if (req.params.userId = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Insert into database
        const {event_id, user_comment} = req.body
        pool.query("Insert INTO event_comments (user_id, event_id, comment) VALUES ($1, $2, $3) RETURNING *", [req.params.userId, event_id, user_comment], () => {
            if (error) {
                throw error
            }

            request = result.rows[0]
            res.status(201).send(`Sucessfully created comment from ${request.user_id} in event ${request.event_id}`)
        })
    }
})

/*
*   Functionality: Pull all comments from a user.
*/
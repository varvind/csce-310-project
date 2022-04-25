var express = require('express');
var router = express.Router();

router.post("/create/comment/:userId", (req, res, next) => {
    if (req.params.userId = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
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
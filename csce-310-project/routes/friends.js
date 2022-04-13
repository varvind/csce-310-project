var express = require('express');
var router = express.Router();

router.post("/create/request", (req, res, next) => {
    if(req.session.userId == null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        const {requested_user_id} = req.body
        pool.query("Insert INTO friend_request (user_initiator_id, user_id) VALUES ($1, $2) RETURNING *", [req.session.userId, requested_user_id], (error, result) => {
            if(error) {
                throw error
            }
            request = result.rows[0]
            res.status(201).send(`Successfully created friend request from ${request.user_initiator_id} to ${request.user_id}`)
        })
        
    }
})



module.exports = router;

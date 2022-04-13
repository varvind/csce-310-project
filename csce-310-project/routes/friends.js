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

router.post("/add/:user_id", (req, res, next) => {
    if(req.session.userId == null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        const requested_user_id = req.params.user_id

        pool.query("DELETE FROM friend_request where user_initiator_id = $1 and user_id = $2", [req.session.userId, requested_user_id], (error, result) => {
            if(error) {
                throw error
            }
        })

        pool.query("INSERT INTO friends (user_id_1, user_id_2, relationship) VALUES($1, $2, $3)", 
        [req.session.userId, requested_user_id, "friend"], (error, result) => {
            if(error) {
                throw error
            }

            res.status(201).send("Successfully added friend")
        })
    }
})

router.post('/update/status/:friend_id', (req, res, next) => {
    if(req.session.userId == null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        const friend_id = req.params.friend_id
        const {status} = req.body
        pool.query("UPDATE friends SET relationship = $3 where (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1)", [req.session.userId, friend_id, status], (error, result) => {
            if(error) {
                throw error
            }
            res.status(201).send("Successfully updated status of friendship")
        })
    }
})



module.exports = router;

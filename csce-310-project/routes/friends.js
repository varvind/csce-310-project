var express = require('express');
var router = express.Router();

router.post("/create/request", (req, res, next) => {
    const {requested_user_id} = req.body
    pool.query("Insert INTO friend_request (user_initiator_id, user_id) VALUES ($1, $2) RETURNING *", [req.session.userId, requested_user_id], (error, result) => {
        if(error) {
            throw error
        }
        request = result.rows[0]
        res.status(201).send(`Successfully created friend request from ${request.user_initiator_id} to ${request.user_id}`)
    }) 
})

router.post("/add/:user_id", (req, res, next) => {
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
})

router.post('/update/status/:user_id/:friend_id', (req, res, next) => {
    const friend_id = req.params.friend_id
    const user_id = req.params.user_id
    const {status} = req.body
    pool.query("UPDATE friends SET relationship = $3 where (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1)", [user_id, friend_id, status], (error, result) => {
        if(error) {
            throw error
        }
        res.status(201).send("Successfully updated status of friendship")
    })
})

router.get('/get/:id', (req, res, next) => {

    pool.query("Select profile_bio, first_name, last_name, user_id FROM users WHERE user_id in (SELECT CASE WHEN @user_id_1 = $1 THEN user_id_2 WHEN @user_id_2 = $1 THEN user_id_1 end as final_user_id FROM friends)", [req.params.id], (error, result) => {
        if(error) {
            throw error
        }
        friends = result.rows
        res.status(201).send(friends)
    })
})

router.get('/get/status/:user_id/:friend_id', (req, res, next) => {
    pool.query("Select relationship from friends where (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1=$2 AND user_id_1 = $1);", [req.params.user_id, req.params.friend_id], (error, result) => {
        if(error) {
            next(error)
        }

        relationship = result.rows[0]
        res.status(200).send(relationship)
    })
})

module.exports = router;

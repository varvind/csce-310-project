// File Developed by Arvind V.

var express = require('express');
var router = express.Router();

// Create Friend Request
router.post("/create/request/:user_id/:requested_user_id", (req, res, next) => {
    const requested_user_id = req.params.requested_user_id
    console.log(requested_user_id)
    console.log(req.params.user_id)
    pool.query("Insert INTO friend_request (user_initiator_id, user_id) VALUES ($1, $2) RETURNING *", [req.params.user_id, requested_user_id], (error, result) => {
        if(error) {
            console.log(error)
            res.status(200).send(error)
        }
        if(!result) {
            res.status(200).send("Duplicate Key")
        } else {
            request = result.rows[0]
            res.status(201).send(`Successfully created friend request from ${request.user_initiator_id} to ${request.user_id}`)
        }
        
    }) 
})

// Add Friend and Delete Friend Request
router.post("/add", (req, res, next) => {
    const requested_user_id = req.body.requested_id
    const user_id = req.body.user_id
    console.log(requested_user_id, user_id)
    pool.query("DELETE FROM friend_request where user_initiator_id = $1 and user_id = $2", [requested_user_id, user_id], (error, result) => {
        if(error) {
            throw error
        }
    })

    pool.query("INSERT INTO friends (user_id_1, user_id_2, relationship) VALUES($1, $2, $3)", 
    [user_id, requested_user_id, "friend"], (error, result) => {
        if(error) {
            throw error
        }

        res.status(201).send("Successfully added friend")
    })
})

// Update Friend Status
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

// Get Friend Information
router.get('/get/:id', (req, res, next) => {

    pool.query("Select profile_bio, first_name, last_name, user_id FROM users WHERE user_id in (SELECT CASE WHEN @user_id_1 = $1 THEN user_id_2 WHEN @user_id_2 = $1 THEN user_id_1 end as final_user_id FROM friends)", [req.params.id], (error, result) => {
        if(error) {
            throw error
        }
        friends = result.rows
        res.status(201).send(friends)
    })
})

// Get Friend Relationship status
router.get('/get/status/:user_id/:friend_id', (req, res, next) => {
    pool.query("Select relationship from friends where (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1=$2 AND user_id_1 = $1);", [req.params.user_id, req.params.friend_id], (error, result) => {
        if(error) {
            next(error)
        }
        relationship = {}
        if(result.rows.length > 0) {
            relationship = result.rows[0]
        }
        res.status(200).send(relationship)
    })
})

// Get Specific Friend Request
router.get('/get/request/:user_id/:friend_id', (req, res, next) => {
    pool.query("Select * from friend_request where (user_initiator_id = $1 AND user_id = $1);", [req.params.user_id, req.params.friend_id], (error, result) => {
        if(error) {
            next(error)
        }
        friend_request = {}
        if(result && result.rows.length > 0) {
            friend_request = result.rows[0]
        }
        res.status(200).json(friend_request)
    })
})

// Get All Friend Requests
router.get('/get/requests/:user_id', (req, res, next) => {
    pool.query("SELECT * FROM users WHERE user_id IN (SELECT user_initiator_id FROM friend_request WHERE (user_id = $1))", [req.params.user_id], (error, result) => {
        if(error) {
            next(error)
        }
        requests = []
        if(result.rows.length > 0) {
            requests = result.rows
        }
        res.status(200).send(requests)
    })
})

// Delete Friend
router.delete('/delete/:user_id/:friend_id', (req, res, next) => {
    user_id = req.params.user_id
    friend_id = req.params.friend_id
    pool.query("Delete from friends where (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1)", [user_id, friend_id], (error, result) => {
        if(error) {
            next(error)   
        }
        res.status(200).send("Successfully deleted friend")
    })
})

module.exports = router;

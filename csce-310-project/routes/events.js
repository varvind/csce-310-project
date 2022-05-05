// Joshua Kim
var express = require('express');
const { request } = require('../app');
var router = express.Router();

/*
 *  Functionality: Add event to user's list
 */
router.post("/create/:user_id", (req, res) => {
    if (req.params.user_id == null) {
        res.status(308).send(`User not logged in`)
    } else {
        // insert
        const {eventId, status} = req.body
        pool.query("INSERT INTO event_followers(user_id, event_id, status) VALUES ($1, $2, $3)", [req.params.user_id, eventId, status], (error, results) => {
            if (error) {
                console.log(error)
                res.status(200).send(error)
            } else {
                //request = results.rows[0]
                //res.status(201).send(`Sucessfully created comment from ${request.user_id} in event ${request.event_id}`)
                res.status(201).send(`Sucessfully created comment`)
            }
        })
    }  
})

/*
 *  Functionality: Grab all events the user has marked/followed
 */
router.get("/get/:user_id", (req, res) => {
    console.log("Get request from:", req.params.user_id)
    pool.query('SELECT * FROM "adminEvents" INNER JOIN event_followers ON "adminEvents".event_id = event_followers.event_id WHERE event_followers.user_id = $1', [req.params.user_id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
            next(error)
        } else {
            events = []
            if (result.rows.length > 0) {
                events = result.rows
            }
            res.status(200).send(events)
        }
    })
})

/*
 *  Functionality: Update the status of the event ("Going" or "Maybe")
 */
router.post("/update/:userId", (req, res) => {
    const {eventId, status} = req.body
    pool.query("UPDATE event_followers SET status = $1 WHERE user_id = $2 AND event_id = $3 RETURNING *", [status, req.params.userId, eventId], (error, results) => {
        if (error) {
            throw error
        }
        request = results.row
        res.status(200).send(`Successfully updated status to ${request.status}`)
    })
})

/*
 *  Functionality: Delete/Unfollow the event
 */
router.delete("/delete/:user_id/:event_id", (req, res) => {
    console.log("Deleting Event:", req.params.event_id, ". Initiated by user:", req.params.user_id)
    pool.query("DELETE FROM event_followers WHERE user_id = $1 AND event_id = $2", [req.params.user_id, req.params.event_id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        } else {
            // send deleted event to console for testing
            // request = results.row[0]
            res.status(200).send(`Successfully deleted the event`)
        } 
    })
})

module.exports = router;
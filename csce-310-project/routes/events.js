// Joshua Kim
var express = require('express');
const { request } = require('../app');
var router = express.Router();

/*
 *  Functionality: Add event to user's list
 */
router.post("/create/:userId", (req, res, next) => {
    if (req.params.userId = null) {
        res.status(308).send(`User not logged in`)
    } else {
        // insert
        const {eventId, status} = req.body
        pool.query("INSERT INTO Event_Followers(user_id, event_id, status) VALUES ($1, $2, $3)", [req.params.userId, eventId, status],(error, results) => {
            if (error) {
                throw error
            }

            request = result.row[0]
            res.status(201).send(`User has successfully added event ${request.event_id} to his list as status of ${results.status}`)
        })
    }  
})

/*
 *  Functionality: Grab all events the user has marked/followed
 */
router.get("/query/:userId", (req, res) => {
    pool.query("SELECT * FROM Events INNER JOIN Event_Followers ON Events.event_id = Event_Followers.event_id WHERE Event_Followers.user_id = $1", [req.params.userId], (error, results) => {
        if (error) {
            throw error
        }
        request = results.rows
        res.status(200).send(`${request.event_id}`)
    })
})

/*
 *  Functionality: Update the status of the event ("Going" or "Maybe")
 */
router.post("/update/:userId", (req, res) => {
    const {eventId, status} = req.body
    pool.query("UPDATE Event_Followers SET status = $1 WHERE user_id = $2 AND event_id = $3 RETURNING *", [status, req.params.userId, eventId], (error, results) => {
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
router.post("/delete/:userId", (req, res) => {
    const {eventId} = req.body
    pool.query("DELETE FROM Event_Followers WHERE user_id = $1 AND event_id = $2", [req.params.userId, eventId], (error, results) => {
        if (error) {
            throw error
        }
        request = results.row
        res.status(200).send(`Successfully deleted ${request.event_id}`)
    })
})

module.exports = router;
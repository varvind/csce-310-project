// Joshua Kim
var express = require('express');
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
        pool.query("INSERT INTO Event_Followers(user_id, event_id, status) VALUES ($1, $2, $3)", [req.params.userId, eventId, status],() => {
            if (error) {
                throw error
            }

            request = result.row[0]
            res.status(201).send(`User has successfully added event ${request.eventId} to his list as status of ${request.status}`)
        })
    }  
})

/*
 *  Functionality: Grab all events the user has marked/followed
 */
router.get("/query/:userId", (req, res) => {
    pool.query("", () => {
        if (error) {
            throw error
        }
    })
})

/*
 *  Functionality: Update the status of the event ("Going" or "Maybe")
 */
router.post("/update/:userId", (req, res) => {
    const eventId = req.body
    pool.query("", () => {
        if (error) {
            throw error
        }
    })
})

/*
 *  Functionality: Delete/Unfollow the event
 */
router.post("", (req, res) => {
    pool.query("", () => {
        if (error) {
            throw error
        }
    })
})
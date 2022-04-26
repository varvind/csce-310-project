// Joshua Kim
var express = require('express');
var router = express.Router();

/*
 *  Functionality: Add event to user's list
 */
router.post("/create/:userId", (req, res, next) => {
    const eventId = req.body

    pool.query("INSERT INTO Event_Followers", () => {
        if (error) {
            throw error
        }
    })
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
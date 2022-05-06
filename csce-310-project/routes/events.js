var express = require('express');
var router = express.Router();

// Developed by Joshua Kim

/*
 *  Functionality: Add event to user's list
 */
router.post("/create/:user_id", (req, res) => {
    const event_id = req.body.event_id
    
    pool.query("INSERT INTO event_followers(user_id, event_id) VALUES ($1, $2)", [req.params.user_id, event_id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        } else {
            res.status(201).send(`Sucessfully created comment`)
        }
    })
})

/*
 *  Functionality: Grab all events the user has marked/followed
 */
router.get("/get/:user_id", (req, res) => {
    console.log("Get request from:", req.params.user_id)
    pool.query('SELECT * FROM admin_events INNER JOIN event_followers ON admin_events.event_id = event_followers.event_id WHERE event_followers.user_id = $1', [req.params.user_id], (error, result) => {
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
 *  Functionality: Get a specific event name
 */
router.get('/get/specific/name/:event_id', (req, res) => {
    console.log(`get/specific/name/:${req.params.event_id}`)
    pool.query('SELECT title FROM admin_events WHERE event_id = $1', [req.params.event_id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        } else {
            eventName = []
            eventName = results.rows[0]
            res.status(200).send(eventName)
        }
    })
})

/*
 *  Functionality: Get a specific event status
 */
router.get('/get/specific/status/:event_id', (req, res) => {
    pool.query('SELECT status FROM event_followers WHERE event_id = $1', [req.params.event_id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        }

        stat = {}
        if (result.rows.length > 0) {
            stat = result.rows[0]
        }
        res.status(200).send(stat)
    })
})


/*
 *  Functionality: Update the status of the event ("Going" or "Maybe or Null")
 */
router.post("/update/:user_id/:event_id", (req, res) => {
    const user_id = req.params.user_id
    const event_id = req.params.event_id;
    const new_status = req.body.status
    console.log("new status:", new_status, typeof(new_status))
    pool.query("UPDATE event_followers SET status = $1 WHERE user_id = $2 AND event_id = $3 RETURNING *", [new_status, user_id, event_id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        }
        // request = results.rows
        res.status(201).send(`Successfully updated status`)
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
            res.status(200).send(`Successfully deleted the event`)
        } 
    })
})

module.exports = router;
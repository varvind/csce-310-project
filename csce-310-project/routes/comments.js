// Joshua Kim
var express = require('express');
var router = express.Router();

/*
 *   Functionality: Creating a new post and storing it in the database
 */
router.post("/create/:userId", (req, res, next) => {
    // Check if anyone is logged in. You should not be able to create a post from a null user.
    if (req.params.userId = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Insert into database
        const {event_id, user_comment} = req.body
        pool.query("INSERT INTO event_comments (user_id, event_id, comment) VALUES ($1, $2, $3) RETURNING *", [req.params.userId, event_id, user_comment], (error, results) => {
            if (error) {
                throw error
            }

            request = result.rows[0]
            res.status(201).send(`Sucessfully created comment from ${request.user_id} in event ${request.event_id}`)
        })
    }
})

/*
 *   Functionality: Pull all comments from a user.
 */
router.get("/get/:userId", (req, res) => {
    // Check if anyone is logged in.
    if (req.params.userId = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Pull comments and user info from database where userid of a row = the userid from the url
        pool.query("SELECT Event_Comments.user_id, Event_Comments.comment_id, Event_Comments.event_id, Event_Comments.comments, Users.username, Event.Title FROM Event_Comments INNER JOIN Users ON Event_Comments.user_id = Users.user_id INNER JOIN on Event_Comments.event_id = Events.event_id WHERE user_id = $1", [req.params.userId], (error, results) => {
            if (error) {
                throw error
            }

            // request = results.rows[0]
            res.status(200).send(`Successfully pulled all comments from ${req.params.userId}`)
        })
    }
})

/*
 *  Functionality: Pull specific comment
 */
router.get("/get/specific/:userId", (req, res) => {
    const comment_id = req.body
    pool.query("SELECT * FROM Event_Comments WHERE comment_id = $1 AND user_id = $2", [comment_id, req.params.userId], (error, results) => {
        if (error) {
            throw error
        }

        request = results.row
        res.status(200).send(`Pulled ${request.comment_id} by ${request.user_id}`)
    })
})

/*
 *  Functionality: Allow editing any user comments
 */
router.post("/update/:userId", (req, res) => {
    const {comment_id, new_comment} = req.body
    pool.query("UPDATE Event_Comments SET comments = $1 WHERE userId = $2 AND comment_id = $3 RETURNING *", [new_comment, req.params.userId, comment_id],(error, results) => {
        if (error) {
            throw error
        }

        request = results.row
        res.status(200).send(`${old_comment} updated to ${request.comments}`)
    })
})

/*
 *  Functionality: Allow the deletion of comments
 */
router.post("/delete/:userId/:comment_id", (req, res) => {
    pool.query("DELETE FROM Event_Comments WHERE user_id = $1 AND comments = $2", [req.params.userId, req.params.comment_id],(error, results) => {
        if (error) {
            throw error
        }
        // send deleted comment to console for testing
        request = results.row[0]
        res.status(200).send(`Successfully deleted the comment ${request.comments}`)
    })
})

module.exports = router;
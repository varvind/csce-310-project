// Joshua Kim
var express = require('express');
const { request } = require('../app');
var router = express.Router();

/*
 *   Functionality: Creating a new post and storing it in the database
 */
router.post("/create/:user_id", (req, res, next) => {
    // Check if anyone is logged in. You should not be able to create a post from a null user.
    if (req.params.user_id = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Insert into database
        const user_id = req.params.user_id;
        const {event_id, user_comment} = req.body
        pool.query("INSERT INTO event_comments (user_id, event_id, comments) VALUES ($1, $2, $3) RETURNING *", [user_id, event_id, user_comment], (error, results) => {
            if (error) {
                console.log(error)
                res.status(200).send(error)
            } else {
                //request = result.rows[0]
                //res.status(201).send(`Sucessfully created comment from ${request.user_id} in event ${request.event_id}`)
                res.status(201).send(`Sucessfully created comment`)
            }
        })
    }
})

/*
 *   Functionality: Pull all comments from a user.
 */
router.get("/get/:user_id", (req, res) => {
    // Check if anyone is logged in.
    if (req.params.user_id = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Pull comments and user info from database where userid of a row = the userid from the url
        pool.query("SELECT event_comments.user_id, event_comments.comment_id, event_comments.event_id, event_comments.comments, users.username, events.title FROM event_comments INNER JOIN users ON event_comments.user_id = users.user_id INNER JOIN events ON event_comments.event_id = events.event_id WHERE event_comments.user_id = $1", [req.params.userId], (error, results) => {
            if (error) {
                console.log(error)
                res.status(200).send(error)
            } else {
                // request = results.rows[0]
                res.status(200).send(`Successfully pulled all comments`)
            } 
        })
    }
})

/*
 *  Functionality: Pull specific comment
 */
router.get("/get/specific/:comment_id", (req, res) => {
    pool.query("SELECT * FROM Event_Comments WHERE comment_id = $1", [req.params.comment_id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        } else {
            // request = results.rows
            res.status(200).send(`Pulled comment`)
        }
    })
})

/*
 *  Functionality: Allow editing any user comments
 */
router.post("/update/:userId", (req, res) => {
    const {comment_id, new_comment} = req.body
    pool.query("UPDATE Event_Comments SET comments = $1 WHERE userId = $2 AND comment_id = $3 RETURNING *", [new_comment, req.params.userId, comment_id],(error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        } else {
            // request = results.row
            // res.status(200).send(`${old_comment} updated to ${request.comments}`)
            res.status(200).send(`Updated comment`)
        }   
    })
})

/*
 *  Functionality: Allow the deletion of comments
 */
router.post("/delete/:userId/:comment_id", (req, res) => {
    pool.query("DELETE FROM Event_Comments WHERE user_id = $1 AND comment_id = $2", [req.params.userId, req.params.comment_id],(error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        } else {
            // send deleted comment to console for testing
            // request = results.row[0]
            res.status(200).send(`Successfully deleted the comment`)
        } 
    })
})

module.exports = router;
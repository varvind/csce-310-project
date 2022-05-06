// Joshua Kim
var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();


var jsonParser = bodyParser.json()
var formData = bodyParser.text()


/*
 *   Functionality: Creating a new post and storing it in the database
 */
router.post('/create/:user_id', formData, (req, res) => {
    // Check if anyone is logged in. You should not be able to create a post from a null user.
    const user_id = req.params.user_id;
    const {event_id, user_comment} = req.body
    console.log(`user_id: ${user_id}`)
    console.log(`req.event_id: ${req.body.event_id}`)
    console.log(`req.user_comment: ${req.body.user_comment}`)
    console.log(`req.body: ${req.body}`)
    if (user_id == null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Insert into database
        console.log(user_id, event_id, user_comment)
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
router.get('/get/:user_id', (req, res, next) => {
    // Check if anyone is logged in.
    // Pull comments and user info from database where userid of a row = the userid from the url
    const user_id = req.params.user_id
    console.log(user_id)
    pool.query('SELECT event_comments.user_id, event_comments.comment_id, event_comments.event_id, event_comments.comments, users.username, "adminEvents".title FROM event_comments INNER JOIN users ON event_comments.user_id = users.user_id INNER JOIN "adminEvents" ON event_comments.event_id = "adminEvents".event_id WHERE event_comments.user_id = $1', [req.params.user_id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
            next(error)
        } else {
            // request = results.rows[0]
            comments = []
            if (result.rows.length > 0) {
                comments = result.rows
            }
            res.status(200).send(comments)
        } 
    })
})

/*
 *  Functionality: Pull specific comment
 */
router.get('/get/specific/:comment_id', (req, res) => {
    pool.query("SELECT comments FROM Event_Comments WHERE comment_id = $1", [req.params.comment_id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(200).send(error)
        } else {
            request = []
            request = results.rows[0]
            res.status(200).send(request)
        }
    })
})

/*
 *  Functionality: Allow editing any user comments
 */
router.post('/update/:userId', (req, res) => {
    const {comment_id, new_comment} = req.body
    console.log(`comment_id: ${comment_id}, new_comment: ${new_comment}`)
    pool.query("UPDATE Event_Comments SET comments = $1 WHERE user_id = $2 AND comment_id = $3 RETURNING *", [new_comment, req.params.userId, comment_id],(error, results) => {
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
router.delete('/delete/:user_id/:comment_id', (req, res) => {
    console.log(`Delete query`)
    console.log(`user_id = ${req.params.user_id} and comment_id = ${req.params.comment_id}`)
    pool.query("DELETE FROM Event_Comments WHERE user_id = $1 AND comment_id = $2", [req.params.user_id, req.params.comment_id],(error, results) => {
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
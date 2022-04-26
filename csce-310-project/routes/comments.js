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
        pool.query("INSERT INTO event_comments (user_id, event_id, comment) VALUES ($1, $2, $3) RETURNING *", [req.params.userId, event_id, user_comment], () => {
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
router.get("/mycomments/:userId", (req, res) => {
    // Check if anyone is logged in.
    if (req.params.userId = null) {
        res.status(308).send(`Error user not logged in`)
    } else {
        // Pull comments from database where userid of a row = the userid from the url
        pool.query("SELECT comments FROM Event_Comments WHERE user_id = " + req.params.userId, () => {
            if (error) {
                throw error
            }
        })
        
        // request = results.rows[0]
        res.status(200).send(`Successfully pulled all comments from ${req.params.userId}`)
    }
})

/*
 *  Functionality: Allow editing of comments
 */
router.post("/update/:userId", (req, res) => {
    const {old_comment, new_comment} = req.body
    query = "INSERT INTO Event_Comments (comments) VALUES "
    pool.query("INSERT INTO Event_Comments " + new_comment + " WHERE user_id = " + req.params.userId + " AND comments = " + old_comment, () => {
        if (error) {
            throw error
        }
    })
    
    request = results.row[0]
    res.status(200).send(`Successfully updated the comment ${old_comment} to ${request.comments}`)
})

/*
 *  Functionality: Allow the deletion of comments
 */
router.post("/delete/:userId", (req, res) => {
    const comment_to_delete = req.body
    pool.query("DELETE FROM Event_Comments WHERE user_id = " + req.params.userId + " AND comments = " + comment_to_delete, () => {
        if (error) {
            throw error
        }
    })

    // send deleted comment to console for testing
    request = results.row[0]
    res.status(200).send(`Successfully deleted the comment ${request.comments}`)
})
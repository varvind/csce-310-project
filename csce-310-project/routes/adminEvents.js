// edited by the best coder in the team: Jakob Evangelista
var express = require('express');
var router = express.Router();

// create event
router.post('/create/:page_id', function(req, res, next) {
    const page_id = req.params.page_id
    const {title, description, time, location} = req.body
    pool.query("INSERT INTO events (page_id, title, description, time, location) VALUES ($1, $2, $3, $4, $5) RETURNING *", [page_id, title, description, time, location], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not add event")
        }
        res.json(poolres.rows[0])
    })
})

// update page
router.post('/update/:page_id', (req, res) => {
    const {title, description, time, location} = req.body
    query = 'UPDATE events SET '
    if(title != null && title != "") {
      query += `title = \'${title}\', `
    }
    if(description != null && description != "") {
      query += `description = \'${description}\', `
    }
    if(time != null && time != "") {
      query += `time = \'${time}\', `
    }
    if(location != null && location != "") {
      query += `location = \'${location}\', `
    }
    query = query.substring(0, query.length - 2)
    query += ` where event_id = ${req.params.event_id}`
    console.log(query)
    pool.query(query, (error, result) => {
      if(error) {
        next(error)
      }
      res.status(201).send(`Event successfully updated`)
    })
  
})

router.delete('/delete', function(req, res, next) {
    const event_id = req.body.userid
    pool.query("DELETE FROM events WHERE event_id=$1", [event_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete event")
        }
        res.status(200).send("Event deleted")
    })
})

// search event
router.get('/get/:page_id/:event_id', function(req, res, next){
    const page_id = req.params.page_id
    const event_id = req.params.event_id
    pool.query("SELECT * FROM page WHERE (page_id=$1 AND event_id=$2)", [page_id, event_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Page does not exist")
        }
        res.json(poolres.rows[0])
    })
})

module.exports = router
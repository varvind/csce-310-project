// edited by the best coder in the team: Jakob Evangelista
var express = require('express');
var router = express.Router();

// create event
router.post('/create/:page_id', function(req, res, next) {
    const page_id = req.params.page_id
    const {title, description, location} = req.body
    pool.query("INSERT INTO adminEvents (page_id, title, description, location_stamp) VALUES ($1, $2, $3, $4) RETURNING *", [page_id, title, description, location], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not add event")
        }
        res.status(201).send(`${poolres.rows[0]}`)
    })
})

// update event
router.post('/update/:event_id', (req, res) => {
    const {title, description, location} = req.body
    query = 'UPDATE adminEvents SET '
    if(title != null && title != "") {
      query += `title = \'${title}\', `
    }
    if(description != null && description != "") {
      query += `description = \'${description}\', `
    }
    if(location != null && location != "") {
      query += `location_stamp = \'${location}\', `
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

// delete event
router.delete('/delete/:event_id', function(req, res, next) {
    const event_id = req.params.userid
    pool.query("DELETE FROM adminEvents WHERE event_id=$1", [event_id], (poolerr, poolres) => {
        if(poolerr) {
            console.log(poolerr)
            res.status(400).send("Could not delete event")
        }
        res.status(200).send("Event deleted")
    })
})

// get all events from specified page
router.get('/get/:page_id', function(req, res, next){
  const page_id = req.params.page_id
  pool.query("SELECT title, description, location_stamp, event_id FROM adminEvents WHERE page_id=$1", [page_id], (poolerr, poolres) => {
      if(poolerr) {
          console.log(poolerr)
          res.status(400).send("Events does not exist")
      }
      events = poolres.rows
      res.status(201).send(events)
  })
})

module.exports = router
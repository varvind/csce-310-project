// edited by the best coder in the team: Jakob Evangelista
// Last get request: Joshua Kim
const { query } = require('express');
var express = require('express');
var router = express.Router();


// create event
router.post("/create/:page_id", (req, res, next) => {

  const {title, description, location_stamp} = req.body
  pool.query("INSERT INTO admin_events (page_id, title, description, location_stamp) VALUES ($1, $2, $3, $4) RETURNING *", [req.params.page_id, title, description, location_stamp], (error, results) => {
      if (error) {
          console.log(error)
          res.status(400).send("error creating event")
          next(error)
      }

      res.status(201).send(`${results.rows[0]}`)
      
  }) 
})

// update event
router.post('/update/:event_id', (req, res) => {
    const {title, description, location_stamp} = req.body
    query1 = 'UPDATE admin_events SET '
    if(title != null && title != "") {
      query1 += `title = \'${title}\', `
    }
    if(description != null && description != "") {
      query1 += `description = \'${description}\', `
    }
    if(location_stamp != null && location_stamp != "") {
      query1 += `location_stamp = \'${location_stamp}\', `
    }
    query1 = query1.substring(0, query1.length - 2)
    query1 += ` where event_id = ${req.params.event_id}`
    console.log(query1)
    pool.query(query1, (error, result) => {
      if(error) {
        next(error)
      }
      res.status(201).send(`Event successfully updated`)
    })
  
})

// delete event
router.delete('/delete/:event_id', function(req, res, next) {
    const event_id = req.params.event_id
    pool.query("DELETE FROM admin_events WHERE event_id=$1", [event_id], (poolerr, poolres) => {
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
  pool.query("SELECT title, description, location_stamp, event_id FROM admin_events WHERE page_id=$1", [page_id], (poolerr, poolres) => {
      if(poolerr) {
          console.log(poolerr)
          res.status(400).send("Events does not exist")
      }
      events = poolres.rows
      res.status(201).send(events)
  })
})

// developed by Joshua Kim
/* 
 *  Functionality: Get all events listed by admins
 */
router.get('/get/all/pages/events', function(req, res) {
  pool.query("SELECT * FROM admin_events", (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).send("Events does not exist")
      next(error)
    }
    events = result.rows
    res.status(201).send(events)
  })
})

module.exports = router
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.post('/create', function(req, res, next) {
  first_name = req.body.first_name
  last_name = req.body.last_name
  username = req.body.username
  password = req.body.password
  profile_bio = req.body.profile_bio

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if(err) {
      throw error
    }

    pool.query('INSERT INTO users (first_name, last_name, username, password, profile_bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [first_name, last_name, username, hash, profile_bio], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
    })
  });
});

router.get('/get/:id', function(req, res, next) {
  res.json(req.params.id)
});

module.exports = router;

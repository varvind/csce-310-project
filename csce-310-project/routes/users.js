// File Developed by Arvind V.

var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create User
router.post('/create', function(req, res, next) {
  first_name = req.body.first_name
  last_name = req.body.last_name
  username = req.body.username
  password = req.body.password
  profile_bio = req.body.profile_bio

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if(err) {
      res.status(400).send("Could Not Hash Password")
      next(err)
    }

    pool.query('INSERT INTO users (first_name, last_name, username, password, profile_bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [first_name, last_name, username, hash, profile_bio], (error, results) => {
      if (error) {
        console.log(error)
        res.status(400).send("Error With Creating User, Duplicate Username or Missing Information")
        next(error)
      } else {
        res.status(201).send(`${results.rows[0].user_id}`)
      }      
    })
  });
});

// Login user
router.post('/login', (req, res, next) => {
  const {username, password} = req.body
  pool.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {
    if(error) {
      throw error
    }
    user = result.rows[0]
    if(user != null) {
      bcrypt.compare(password, user.password, (error, match) => {
        if(error) {
          next(error)
        }
        if (match) {
          res.status(200).send(`${user.user_id}`)
        } else {
          res.status(400).send('invalid password')
        }
      })
    } else {
      res.status(400).send('invalid username, resource not found')
    }
    
  })

})

// Update User
router.post('/update/:user_id', (req, res) => {
    const {first_name, last_name, username, profile_bio} = req.body
    query = 'UPDATE users SET '
    if(first_name != null && first_name != "") {
      query += `first_name = \'${first_name}\', `
    }
    if(last_name != null && last_name != "") {
      query += `last_name = \'${last_name}\', `
    }
    if(username != null && username != "") {
      query += `username = \'${username}\', `
    }
    if(profile_bio != null && profile_bio != "") {
      query += `profile_bio = \'${profile_bio}\', `
    }
    query = query.substring(0, query.length - 2)
    query += ` where user_id = ${req.params.user_id}`
    console.log(query)
    pool.query(query, (error, result) => {
      if(error) {
        next(error)
      }
      res.status(201).send(`User successfully updated`)
    })
  
})

// Delete User
router.delete('/delete/:user_id', function(req, res, next) {

  pool.query("Delete from users where user_id = $1", [req.params.user_id], (error, result) => {
    if(error) {
      res.status(400).send("Error Deleting User")
      next(error)
    } else {
      res.status(200).send('User successfully deleted')
    }
  })
});

// Update User Password
router.post('/update/password/:user_id', function(req, res, next) {
    const {original_password, new_password, confirm_password} = req.body

    pool.query("Select * from users where user_id = $1", [req.params.user_id], (error, result) => {
      if(error) {
        throw error
      }
      user = result.rows[0]
      bcrypt.compare(original_password, user.password, (error, match) => {
        if(error) {
          throw error
        }
        if(match) {
          if(new_password == confirm_password) {
            bcrypt.hash(new_password, saltRounds, (error, hash) => {
              if(error) {
                throw error
              }
              pool.query(`UPDATE users SET password = $1 WHERE user_id = $2`, [hash, req.params.user_id], (error, result) => {
                if(error) {
                  throw error
                }
                res.status(201).send(`User password successfully updated`)
              })
            })
          } else {
            res.status(200).send("New Password and Confirmation don't match")
          }
        } else {
          res.status(200).send("Original Password does not match record")
        }
      })
    }) 
})

// Get User
router.get('/get/:id', (req, res, next) => {
  pool.query('SELECT first_name, last_name, profile_bio, username FROM users where user_id = $1', [req.params.id], (error, result) => {
    if(error) {
      next(error)
    }
    user = result.rows[0]
    res.status(200).send(user)
  })
})

// Search for users given a query
router.get('/search', (req, res, next) => {
  words = req.query.name.split()
  if(req.query.name === '') {
      pool.query("Select first_name, last_name, profile_bio, user_id, username from users", (error, result) => {
          if(error) {
              next(error)
          }
          users = result.rows
          res.status(200).send(users)
      })
  }
  else if(words.length > 2) {
      res.status(200).send([])
  } else if (words.length == 1) {
    first_name = words[0]
    pool.query("Select first_name, last_name, profile_bio, user_id, username from users where first_name = $1", [first_name], (error, result) => {
      if(error) {
          next(error)
      }
      users = result.rows
      res.status(200).send(users)
  })
  } else {
      first_name = words[0]
      last_name = words[1]
      pool.query("Select first_name, last_name, profile_bio, user_id, username from users where first_name = $1 AND last_name = $2", [first_name, last_name], (error, result) => {
          if(error) {
              next(error)
          }
          users = result.rows
          res.status(200).send(users)
      })
  }
})




module.exports = router;

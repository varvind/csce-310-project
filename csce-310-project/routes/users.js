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
      res.status(400).send("Could Not Hash Password")
      next(err)
    }

    pool.query('INSERT INTO users (first_name, last_name, username, password, profile_bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [first_name, last_name, username, hash, profile_bio], (error, results) => {
      if (error) {
        res.status(400).send("Error With Creating User, Please Check Users")
        next(error)
      }
      req.session.userId = results.rows[0].user_id
      res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
    })
  });
});


router.post('/login', (req, res) => {
  const {username, password} = req.body
  pool.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {
    if(error) {
      throw error
    }
    user = result.rows[0]
    if(user != null) {
      bcrypt.compare(password, user.password, (error, match) => {
        if(error) {
          throw error
        }
        if (match) {
          req.session.userId = user.user_id
          req.session.save()
          res.status(200).send(`${user.user_id}`)
          console.log(req.session)
        } else {
          res.status(400).send('invalid password')
        }
      })
    } else {
      res.status(400).send('invalid username, resource not found')
    }
    
  })

})

router.post('/update', (req, res) => {
  if(req.session.userId == null) {
    res.status(308).send(`Error user not logged in`)
  } else {
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
    query += ` where user_id = ${req.session.userId}`
    console.log(query)
    pool.query(query, (error, result) => {
      if(error) {
        throw error
      }
      res.status(201).send(`User successfully updated`)
    })
  }
  
})

router.delete('/delete', function(req, res, next) {
  if(req.session.userId == null) {
    res.status(308).send(`Error user not logged in`)
  } else {
    pool.query("Delete from users where user_id = $1", [req.session.userId], (error, result) => {
      if(error) {
        throw error
      }
      res.status(200).send('User successfully deleted')
    })
  }
});

router.post('/update/password', function(req, res, next) {
  if(req.session.userId == null) {
    res.status(308).send('Error user not logged in')
  } else {
    const {original_password, new_password, confirm_password} = req.body

    pool.query("Select * from users where user_id = $1", [req.session.userId], (error, result) => {
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
              pool.query(`UPDATE users SET password = $1 WHERE user_id = $2`, [hash, req.session.userId], (error, result) => {
                if(error) {
                  throw error
                }
                res.status(201).send(`User password successfully updated`)
              })
            })
          } else {
            res.status(400).send("New Password and Confirmation don't match")
          }
        } else {
          res.status(400).send("Original Password does not match record")
        }
      })
    }) 
    

  }
})

router.get('/get/:id', (req, res, next) => {
  pool.query('SELECT first_name, last_name, profile_bio FROM users where user_id = $1', [req.params.id], (error, result) => {
    if(error) {
      next(error)
    }
    user = result.rows[0]
    res.status(200).send(user)
  })
})




module.exports = router;

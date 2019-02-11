const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
var express = require('express');
var bodyParser = require('body-parser');


module.exports = (app) => {

  // Tell the bodyparser middleware to accept more data
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));



  //signup
  app.post('/signup', function (req, res, next) {

    const user = new User(req.body);

    user.save()
      .then(() => res.json(user))
      .catch((err) => next(err));
  });

  //login
  app.post('/login', function (req, res, next) {
      const loginUser = new User(req.body);

      User.find({
        email: loginUser.email,
        password: loginUser.password
      }, (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }

        if (users.length != 1){
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }

        let currentUser = users[0];

        //create user session
        const newUserSession = new UserSession({
            id: currentUser._id
        });

        newUserSession.save((err, doc) => {
          if (err){
            return res.send({
              success: false,
              message: "Error: Invalid Signin"
            });
          }

          return res.send({
            success: true,
            message: "Valid Signin",
            token: doc.id
          });
        })

      }


      )
  });

  app.get('/getuser', function (req, res, next) {
      const { query } = req;
      const { token } = query;

      User.find({
        _id: token
      }, (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }

        if (users.length != 1){
          return res.send({
            success: false,
            message: "Error: server error"
          });
        } else {
          return res.send(users[0]);
        }

      })
  })

  //verify
  app.get('/verify', function (req, res, next) {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      id: token,
      isLoggedOut: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      }

      if (sessions.length != 1){
        return res.send({
          success: false,
          message: "Error: None found"
        });
      } else {
        return res.send({
          success: true,
          message: "Token verified"
        })
      }


    })



  });

  //Logout
  app.get('/logout', function (req, res, next) {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      id: token,
      isLoggedOut: false
    }, {
       $set:{isLoggedOut: true}
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Servor error"
        });
      }

        return res.send({
          success: true,
          message: "Logged Out"
        })
      }


    )
  });

  app.get('/getprofs', function (req, res, next) {


    User.find({
      type: "professor"
    }, (err, professors) => {
      if (err){
        return res.send({
          success: false,
          message: "Error: server error"
        });
      } else {
        res.send(professors);
      }

    })
  })


};

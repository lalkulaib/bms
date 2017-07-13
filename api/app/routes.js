module.exports = function(app, passport) {

    app.get('/logout', function(req, res) {
        req.logout();
        //res.redirect('/');
        res.send({ result: 'success' })
    });

    app.get('/isloggedin', function(req, res) {
        if (req.isAuthenticated()) {
            res.send({ status: true })
        } else {
            res.send({ status: false })
        }
    });

    // process the signup form
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (! user) {
                return res.send(401,{ success : false, message : info.message, err, user });
            }
            req.login(user, function(err){
               if(err){
                 return next(err);
               }
               return res.send({ success : true, message : 'SignUp Success' });
             });
        })(req, res, next);
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (! user) {
                return res.send(401,{ success : false, message : info.message });
            }
            req.login(user, function(err){
               if(err){
                 return next(err);
               }
               return res.send({ success : true, message : 'Login Success' });
            });
        })(req, res, next);
    });

};


// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

var User = require('../models/User');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  console.log("Cookies: ", req.cookies.timezone);
  
  if (req.user) {
    User.findById(req.user.id, function(err, user) {
      res.render('journal', {
        title: 'Journal',
        journal: user.journal,
//        timezone: req.cookies.timezone
        timezone: 'Africa/Accra'
      })
    });
  }
  else
  {
    res.render('home', {
      title: 'Home'
    })
  }
};
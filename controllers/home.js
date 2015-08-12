var User = require('../models/User');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) {
    User.findById(req.user.id, function(err, user) {
      res.render('journal', {
        title: 'Journal',
        journal: user.journal,
        timezone: req.cookies.timezone
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
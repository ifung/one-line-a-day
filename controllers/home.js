var User = require('../models/User');
var moment = require('moment');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  var timezone = req.cookies.timezone;
  var currTz = moment().tz(timezone);
  
  if (req.user) {
    User.findById(req.user.id, function(err, user) {
      res.render('journal', {
        title: 'Journal',
        timezone: req.cookies.timezone,
        journal: user.journal[currTz.format('MMDD')],
        month: currTz.format('MMMM'),
        day: currTz.format('D')
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
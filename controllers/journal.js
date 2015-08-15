var User = require('../models/User');
var moment = require('moment');

/**
 * GET /journal/:date?
 * Get journal entries.
 */
exports.getJournal = function(req, res) {
  if (req.params.date) {
    var monthday = req.params.date;
    var monthObj = moment(monthday, 'MMDD');
  } else {
    var monthObj = moment().tz(req.cookies.timezone);
    var monthday = monthObj.format('MMDD');
  }
  
  var month = monthObj.format('MMMM');
  var day = monthObj.format('D');
  var previous = monthObj.subtract(1, 'd').format('MMDD');
  var next = monthObj.add(2, 'd').format('MMDD');

  if (req.user) {
    User.findById(req.user.id, function(err, user) {
      res.render('journal', {
        title: 'Journal',
        timezone: req.cookies.timezone,
        journal: user.journal[monthday],
        monthday: monthday,
        month: month,
        day: day,
        previous: previous,
        next: next
      })
    });
  } else {
    res.render('home', {
      title: 'Home'
    })
  }
};

/**
 * POST /journal/:date
 * Save new journal entry.
 */
exports.postJournal = function(req, res, next) {  
  var monthday = req.body.monthday;
  var year = req.body.year;
  var update = { $set: {} };
  
  update.$set["journal." + monthday + "." + year] = req.body.entry;
  
  User.findByIdAndUpdate(req.user.id, update, function(err, user) {
    if (err) return next(err);
    req.flash('success', { msg: 'New entry saved.' });
    res.redirect('/journal');
  });
};
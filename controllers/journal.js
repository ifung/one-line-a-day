var User = require('../models/User');
var moment = require('moment');

/**
 * GET /journal
 * Get journal entries for today.
 */
exports.getJournal = function(req, res) {
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

/**
 * GET /journal/:date
 * Get journal entries for given date.
 */
exports.getJournalByDate = function(req, res) {
  var date = req.params.date;
  var month = moment(date, 'MMDD').format('MMMM');
  var day = moment(date, 'MMDD').format('D');
  
  if (req.user) {
    User.findById(req.user.id, function(err, user) {
      res.render('journal', {
        title: 'Journal',
        timezone: req.cookies.timezone,
        journal: user.journal[date],
        month: month,
        day: day
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
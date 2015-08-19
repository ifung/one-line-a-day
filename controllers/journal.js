var User = require('../models/User');
var moment = require('moment');
var sanitizeHtml = require('sanitize-html');

/**
 * GET /journal/:date?
 * Get journal entries.
 */
exports.getJournal = function(req, res) {
  var monthday, 
      monthObj;
  
  // Date is given in parameters
  if (req.params.date) {
    monthday = req.params.date;
    monthObj = moment(monthday, 'MMDD');
    
    var errors = !monthObj.isValid();
  
    if (errors) {
      req.flash('errors', { msg: 'Date is not valid.' });
      return res.redirect('/journal');
    }
  } else {
    monthObj = moment().tz(req.cookies.timezone);
    monthday = monthObj.format('MMDD');
  }
  
  var month = monthObj.format('MMMM');
  var day = monthObj.format('D');
  var previous = monthObj.subtract(1, 'd').format('MMDD');
  var next = monthObj.add(2, 'd').format('MMDD');
  var journal;
  
  if (req.user) {
    User.findById(req.user.id, function(err, user) {
      if (user.journal) {
        journal = user.journal[monthday];
      }
      
      res.render('journal', {
        title: 'Journal',
        timezone: req.cookies.timezone,
        journal: journal,
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
  var dirty = req.body.entry;
  var clean = sanitizeHtml(req.body.entry, {
    allowedTags: [],
    allowedAttributes: {}
  });
  
  update.$set["journal." + monthday + "." + year] = clean;

  User.findByIdAndUpdate(req.user.id, update, function(err, user) {
    if (err) return next(err);
    req.flash('success', { msg: 'New entry saved.' });
    res.redirect('/journal');
  });
};
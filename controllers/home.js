var User = require('../models/User');
var moment = require('moment');
var journalController = require('../controllers/journal');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) {
    journalController.getJournal(req, res);
  } else {
    res.render('home', {
      title: 'Home'
    })
  }
};
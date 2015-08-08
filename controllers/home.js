/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) {
    res.render('journal', {
      title: 'Journal'
    })
  }
  else
  {
    res.render('home', {
      title: 'Home'
    })
  }
};
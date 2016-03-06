/* GET SPA page */
module.exports.index = function(req, res) {
  res.render('layout', { title: 'Chimichanga' });
}
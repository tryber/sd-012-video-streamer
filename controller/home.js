module.exports = (_req, res) => {
  res.sendFile('static/index.html', { root: __dirname + '/..' });
};
const service = require('../service/stream');

module.exports = async (req, res) => {
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send('Requires range header');
  }

  const stats = await service.intervalStats(range);
  const headers = {
    'Content-Range': `bytes ${stats.start}-${stats.end}/${stats.size}`,
    'Accept-Encoding': 'bytes',
    'Content-Length': stats.end - stats.start + 1,
    'Content-Type': 'video/mp4'
  }

  res.writeHead(206, headers);

  const interval = service.nextInterval(stats.start, stats.end);

  interval.pipe(res);
};
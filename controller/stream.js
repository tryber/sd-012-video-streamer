const fs = require('fs');
const service = require('../service/stream');

module.exports = async (req, res) => {
  // ensure that the request has the range
  const range = req.headers.range;
  if (!range) {
    res.status(400).send('Requires range header');
  }

  // parse range
  const stats = await service.getStats(range);

  const headers = {
    'Content-Range': `bytes ${stats.start}-${stats.end}/${stats.size}`,
    'Accept-Encoding': 'bytes',
    'Content-Length': stats.end - stats.start + 1,
    'Content-Type': 'video/mp4'
  }

  // 206 - partial content
  res.writeHead(206, headers);

  // create stream for this chunk and send it to the client
  const interval = service.nextInterval(stats.end, stats.start);

  interval.pipe(res);
};
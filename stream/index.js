const fs = require('fs');

module.exports = async (req, res) => {
  // ensure that the request has the range
  const range = req.headers.range;
  if (!range) {
    res.status(400).send('Requires range header');
  }

  // get video stats
  const path = 'static/dune-trailer.mp4';
  const size = (await fs.promises.stat(path)).size;

  // parse range
  const CHUNK = Math.pow(10, 6); // 1MB
  const start = Number(range.replace(/\D/g, '')); // Remove spaces
  const end = Math.min(start + CHUNK, size - 1); // Final byte

  // send headers to browser
  const length = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${size}`,
    'Accept-Encoding': 'bytes',
    'Content-Length': length,
    'Content-Type': 'video/mp4'
  }

  // 206 - partial content
  res.writeHead(206, headers);

  // create stream for this chunk and send it to the client
  const stream = fs.createReadStream(path, { start, end });

  stream.pipe(res);
};
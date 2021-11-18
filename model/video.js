const fs = require('fs');
const PATH = 'static/dune-trailer.mp4';

const videoSize = async () => {
  return (await fs.promises.stat(PATH)).size; // model
}

const videoStream = (options) => {
  return fs.createReadStream(PATH, options); // model
}

module.exports = {
  videoSize,
  videoStream,
}
const fs = require('fs');
const PATH = 'static/dune-trailer.mp4';

const getSize = async () => {
  return (await fs.promises.stat(PATH)).size; // model
}

const getStream = (options) => {
  return fs.createReadStream(PATH, options); // model
}

module.exports = {
  getSize,
  getStream,
}
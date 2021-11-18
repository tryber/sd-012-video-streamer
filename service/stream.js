const model = require('../model/video');

const CHUNK = Math.pow(10, 6);

const intervalStats = async (range) => {
  const size = await model.videoSize();

  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK, size - 1);

  return {
    size,
    start,
    end,
  }
};

const nextInterval = (start, end) => {
  return model.videoStream({ start, end });
}

module.exports = {
  intervalStats,
  nextInterval,
}
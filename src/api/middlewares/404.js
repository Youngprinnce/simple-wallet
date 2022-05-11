// eslint-disable-next-line no-unused-vars
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Could not find the requested resource on the server!',
  });
};

module.exports = notFound;

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
};

module.exports = generalErrorHandler;

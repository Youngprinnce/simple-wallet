// success message formate
// eslint-disable-next-line default-param-last
const sendSuccess = (response, data = {}, message, code) => {
  const resp = {
    success: true,
    message,
    data,
  };
  return response.status(code).json(resp);
};

const sendError = (response, message, code) => {
  const resp = {
    success: false,
    message,
    errorCode: code,
  };
  return response.status(code).json(resp);
};

module.exports = {
  sendSuccess,
  sendError,
};

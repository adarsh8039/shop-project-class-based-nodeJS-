// 200
const successResponse = function (data, message) {
  return {
    status: 200,
    message: message,
    data: data,
  };
};

//201
const createdResponse = function (data, message) {
  return {
    status: 201,
    message: message,
    data: data,
  };
};

//400
const badRequestResponse = function (message) {
  return {
    status: 400,
    message: message,
  };
};

//401
const unauthorizedResponse = function (message) {
  return {
    status: 401,
    message: message,
  };
};

//500
const internalServerErrorResponse = function (error) {
  return {
    status: 500,
    message: "Something went wrong",
    error: error,
  };
};

module.exports = {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  unauthorizedResponse,
  badRequestResponse,
};

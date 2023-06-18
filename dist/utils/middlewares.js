"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _logger = _interopRequireDefault(require("./logger"));
var stream = {
  write: function write(message) {
    return _logger.default.http(message);
  }
};
var skip = function skip() {
  var env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
var loggingMiddleware = (0, _morgan.default)(':method :url :status :res[content-length] - :response-time ms', {
  stream: stream,
  skip: skip
});
var authMiddleware = function authMiddleware(req, res, next) {
  if (!req.isAuthenticated()) {
    next((0, _httpErrors.default)(401));
  } else {
    res.status(200).end();
  }
};
var preAuthMiddleware = function preAuthMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/api');
  }
  next();
};
var endPoint404 = function endPoint404(req, res, next) {
  next((0, _httpErrors.default)(404));
};
var errorHandler = function errorHandler(error, req, res, next) {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
  next(error);
};
var middlewares = {
  loggingMiddleware: loggingMiddleware,
  endPoint404: endPoint404,
  errorHandler: errorHandler,
  authMiddleware: authMiddleware,
  preAuthMiddleware: preAuthMiddleware
};
var _default = middlewares;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _config = _interopRequireDefault(require("./utils/config"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _methodOverride = _interopRequireDefault(require("method-override"));
var _middlewares = _interopRequireDefault(require("./utils/middlewares"));
var _logger = _interopRequireDefault(require("./utils/logger"));
var _routes = _interopRequireDefault(require("./routes"));
var app = (0, _express.default)();
app.set('views', _path.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(_express.default.static(_path.default.join(__dirname, '../public')));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use((0, _expressSession.default)({
  secret: _config.default.session_secret,
  resave: false,
  saveUninitialized: false
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.use((0, _methodOverride.default)('_method'));
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use(require('sanitize').middleware);
app.use(_middlewares.default.loggingMiddleware);
app.use('/api', _routes.default);
app.use(_middlewares.default.endPoint404);
app.use(_middlewares.default.errorHandler);
app.listen(_config.default.port, function () {
  _logger.default.http("Server is running on port ".concat(_config.default.port));
});
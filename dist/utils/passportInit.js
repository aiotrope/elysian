"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportInit = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var passportLocal = _interopRequireWildcard(require("passport-local"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var passportInit = function passportInit(passport, getUserByUsername, getUserById) {
  var authenticateUser = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(username, password, done) {
      var user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            user = getUserByUsername(username);
            if (!(user === null)) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", done(null, false, {
              message: 'User not found!'
            }));
          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _bcrypt.default.compare(password, user.password);
          case 6:
            if (!_context.sent) {
              _context.next = 10;
              break;
            }
            return _context.abrupt("return", done(null, user));
          case 10:
            return _context.abrupt("return", done(null, false, {
              message: 'Incorrect login credentials!'
            }));
          case 11:
            _context.next = 16;
            break;
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", done(_context.t0));
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 13]]);
    }));
    return function authenticateUser(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  var LocalStrategy = passportLocal.Strategy;
  passport.use(new LocalStrategy({
    usernameField: 'username'
  }, authenticateUser));
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    return done(null, getUserById(id));
  });
};
exports.passportInit = passportInit;
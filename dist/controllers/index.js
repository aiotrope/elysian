"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _passport = _interopRequireDefault(require("passport"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _passportInit = require("../utils/passportInit");
var _logger = _interopRequireDefault(require("../utils/logger"));
var Users = new Array();
var Todos = [];
(0, _passportInit.passportInit)(_passport.default, function (username) {
  return Users.find(function (user) {
    return user.username === username;
  });
}, function (id) {
  return Users.find(function (user) {
    return user.id === id;
  });
});
var indexPage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //logger.warn(req.user) // from passport
          _logger.default.warn(req.user);
          if (req.user) res.render('index', {
            title: 'Elysian',
            username: req.user.username
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function indexPage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var registration = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var _req$body, username, password, foundUser, saltRounds, hashed, generateId, data, newUser;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          foundUser = Users.find(function (elem) {
            return elem.username === username;
          });
          if (!foundUser) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).end());
        case 4:
          _context2.prev = 4;
          saltRounds = 10;
          _context2.next = 8;
          return _bcrypt.default.hash(password, saltRounds);
        case 8:
          hashed = _context2.sent;
          generateId = Math.floor(Math.random() * 899999 + 100000);
          data = {
            id: generateId,
            username: username,
            password: hashed
          };
          Users.unshift(data);
          newUser = Users.find(function (elem) {
            return elem.username === data.username;
          });
          if (newUser) res.status(200).json(data);
          _context2.next = 20;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](4);
          _logger.default.error(_context2.t0.message);
          res.status(400).json({
            error: _context2.t0.message
          });
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 16]]);
  }));
  return function registration(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var fetchAllUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.status(200).json([].concat(Users));
          } catch (err) {
            res.status(400).json({
              error: err.message
            });
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function fetchAllUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var _req$body2, username, password, user, passwordVerified;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          user = Users.find(function (user) {
            return user.username === username;
          });
          _context4.next = 4;
          return _bcrypt.default.compare(password, user.password);
        case 4:
          passwordVerified = _context4.sent;
          if (!(!passwordVerified || !user)) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(401).end());
        case 7:
          if (req.user) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(401).end());
        case 9:
          _context4.prev = 9;
          req.session.userId = req.user.id;
          req.session.userName = req.user.username;
          return _context4.abrupt("return", res.status(200).send('ok'));
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](9);
          _logger.default.error(_context4.t0);
          res.status(400).json({
            error: _context4.t0.message
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[9, 15]]);
  }));
  return function login(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var createTodo = function createTodo(req, res, next) {
  var todo = req.body.todo;
  if (!req.user) return next((0, _httpErrors.default)(401));
  try {
    var userTodosIndex = Todos.findIndex(function (todo) {
      return todo.id === req.session.userId;
    });
    var userTodos = Todos.find(function (todo) {
      return todo.id === req.session.userId;
    });
    var data = {
      id: req.session.userId,
      todos: [todo]
    };
    if (userTodosIndex !== -1) {
      Todos[userTodosIndex].todos.push(todo);
      _logger.default.warn([].concat(Todos));
      return res.status(200).json(userTodos);
    } else {
      Todos.unshift(data);
      return res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};
var fetchAllTodos = function fetchAllTodos(req, res) {
  try {
    res.status(200).json([].concat(Todos));
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};
var _default = {
  indexPage: indexPage,
  registration: registration,
  fetchAllUsers: fetchAllUsers,
  login: login,
  createTodo: createTodo,
  fetchAllTodos: fetchAllTodos
};
exports.default = _default;
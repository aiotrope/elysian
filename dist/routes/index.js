"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _index = _interopRequireDefault(require("../controllers/index"));
var _middlewares = _interopRequireDefault(require("../utils/middlewares"));
var router = _express.default.Router();
router.get('', _middlewares.default.authMiddleware, _index.default.indexPage);
router.post('/user/register', _middlewares.default.preAuthMiddleware, _index.default.registration);
router.get('/user/list', _index.default.fetchAllUsers);
router.post('/user/login', _middlewares.default.preAuthMiddleware, _passport.default.authenticate('local'), _index.default.login);
router.get('/secret', _middlewares.default.authMiddleware);
router.post('/todos', _index.default.createTodo);
router.get('/todos/list', _index.default.fetchAllTodos);
var _default = router;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv.default.config();
var PORT = process.env.PORT || 3000;
var BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
var SESSION_SECRET = process.env.SESSION_SECRET || 'XUm_tUQFjn&PW@?9!?';
var config = {
  port: PORT,
  base_url: BASE_URL,
  session_secret: SESSION_SECRET
};
var _default = config;
exports.default = _default;
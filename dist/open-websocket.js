"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ws = _interopRequireDefault(require("ws"));

var _reconnectingWebsocket = _interopRequireDefault(require("reconnecting-websocket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(url) {
  var rws = new _reconnectingWebsocket.default(url, [], {
    WebSocket: _ws.default,
    connectionTimeout: 4e3,
    debug: false,
    maxReconnectionDelay: 10e3,
    maxRetries: Infinity,
    minReconnectionDelay: 4e3
  });

  var pong = function pong() {
    return rws._ws.pong(function () {
      return null;
    });
  };

  rws.addEventListener('open', function () {
    rws._ws.on('ping', pong);
  });
  return rws;
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showErrorDialog = showErrorDialog;
exports.showSuccessNotification = showSuccessNotification;
exports.showErrorNotification = showErrorNotification;
exports.emitter = exports.SHOW_NOTIFICATION = exports.SHOW_ERROR_DIALOG = exports.FILE_UPLOAD_STARTED = void 0;

var _mitt = _interopRequireDefault(require("mitt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FILE_UPLOAD_STARTED = 'FILE_UPLOAD_STARTED';
exports.FILE_UPLOAD_STARTED = FILE_UPLOAD_STARTED;
var SHOW_ERROR_DIALOG = 'SHOW_ERROR_DIALOG';
exports.SHOW_ERROR_DIALOG = SHOW_ERROR_DIALOG;
var SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
exports.SHOW_NOTIFICATION = SHOW_NOTIFICATION;
var emitter = (0, _mitt["default"])();
exports.emitter = emitter;

function showErrorDialog(message) {
  emitter.emit(SHOW_ERROR_DIALOG, {
    message: message
  });
}

function showSuccessNotification(message) {
  emitter.emit(SHOW_NOTIFICATION, {
    type: 'success',
    message: message
  });
}

function showErrorNotification(message) {
  emitter.emit(SHOW_NOTIFICATION, {
    type: 'error',
    message: message
  });
}
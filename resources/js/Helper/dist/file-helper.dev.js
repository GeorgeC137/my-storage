"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImage = isImage;
exports.isPDF = isPDF;
exports.isAudio = isAudio;
exports.isVideo = isVideo;
exports.isWord = isWord;
exports.isExcel = isExcel;
exports.isZip = isZip;
exports.isText = isText;

function isImage(file) {
  return /^image\/\w+$/.test(file.mime);
}

function isPDF(file) {
  return ['application/pdf', 'application/x-pdf', 'application/acrobat', 'application/vnd.pdf', 'text/pdf', 'text/x-pdf'].includes(file.mime);
}

function isAudio(file) {
  return ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/ogg', 'audio/webm'].includes(file.mime);
}

function isVideo(file) {
  return ['video/mp4', 'video/ogg', 'video/mpeg', 'video/quicktime', 'video/webm'].includes(file.mime);
}

function isWord(file) {
  return ['application/msword', 'application/vnd.ms-word.document.macroEnabled.12', 'application/vnd.ms-word.template.macroEnabled.12', 'application/vnd.openxmlformats.officedocument.wordprocessingml.document'].includes(file.mime);
}

function isExcel(file) {
  return ['application/vnd.ms-excel', 'application/vnd.openxmlformats.officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel.sheet.macroEnabled.12', 'application/vnd.ms-excel.template.macroEnabled.12'].includes(file.mime);
}

function isZip(file) {
  return ['application/zip'].includes(file.mime);
}

function isText(file) {
  return ['text/plain', 'text/csv', 'text/javascript', 'text/html', 'text/css'].includes(file.mime);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpGet = httpGet;

function httpGet(url) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  });
}
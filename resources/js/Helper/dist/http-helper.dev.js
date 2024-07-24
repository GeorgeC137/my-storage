"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpGet = httpGet;
exports.httpPost = httpPost;

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

function httpPost(url, data) {
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  });
}
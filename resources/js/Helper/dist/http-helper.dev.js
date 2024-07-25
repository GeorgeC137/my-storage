"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpGet = httpGet;
exports.httpPost = httpPost;

var _vue = require("@inertiajs/vue3");

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
  var page = (0, _vue.usePage)();
  console.log(page.props.csrf_token);
  return new Promise(function (resolve, reject) {
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': page.props.csrf_token
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json().then(function (data) {
          reject({
            response: response,
            error: data
          });
        });
      }
    });
  });
}
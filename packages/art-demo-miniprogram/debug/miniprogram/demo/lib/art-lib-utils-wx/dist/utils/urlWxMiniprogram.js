"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.getCurrentPage = function () {
  var pages = getCurrentPages();
  return pages.length ? pages[pages.length - 1] : {};
};

exports.getQueryString = function (name) {
  var _exports$getCurrentPa = exports.getCurrentPage(),
      options = _exports$getCurrentPa.options;

  return options && options[name] ? decodeURIComponent(options[name]) : undefined;
};

exports.toQueryString = function (obj) {
  var parts = [];

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      var paramValue = encodeURIComponent(obj[i]);

      if (paramValue === '' || paramValue === 'undefined') {
        parts.push(encodeURIComponent(i));
      } else {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
  }

  return parts.join('&');
};

exports.parseParamToObj = function (str) {
  if (!str) {
    return {};
  }

  return str.split('&').reduce(function interator(params, param) {
    var equalIndex = param.indexOf('=');
    var paramsFragments = [];

    if (equalIndex !== -1) {
      paramsFragments = [param.substr(0, equalIndex), param.substr(equalIndex + 1)];
    } else {
      paramsFragments = [param];
    }

    var paramSplit = paramsFragments.map(function (value) {
      return decodeURIComponent(value.replace('+', ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
};

exports.appendUrlParameter = function (key, value, url) {
  url = url || '';
  var urlFragmentHash = url.split(/#/)[1] || '';
  var urlFragments = url.replace('#' + urlFragmentHash, '').split('?');
  var urlRoot = urlFragments[0] || '';
  var urlParams = urlFragments[1] || '';
  var params = exports.parseParamToObj(urlParams);

  if (value === null || value === undefined) {
    delete params[key];
  } else {
    params[key] = value;
  }

  var finalUrlFragments = [urlRoot];
  var newUrlParamStr = exports.toQueryString(params);

  if (newUrlParamStr) {
    finalUrlFragments.push('?' + newUrlParamStr);
  }

  if (urlFragmentHash) {
    if (newUrlParamStr) {
      finalUrlFragments.push('#' + urlFragmentHash);
    } else {
      finalUrlFragments.push('?#' + urlFragmentHash);
    }
  }

  return finalUrlFragments.join('');
};
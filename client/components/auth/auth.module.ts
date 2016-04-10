'use strict';

angular.module('euroProno2016WebApp.auth', [
  'euroProno2016WebApp.constants',
  'euroProno2016WebApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

'use strict';

angular.module('euroProno2016WebApp', [
  'euroProno2016WebApp.auth',
  'euroProno2016WebApp.admin',
  'euroProno2016WebApp.constants',
  'euroProno2016WebApp.teams',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

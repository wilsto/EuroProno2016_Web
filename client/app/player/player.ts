'use strict';

angular.module('euroProno2016WebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('player', {
        url: '/player',
        template: '<player></player>'
      });
  });

'use strict';

angular.module('euroProno2016WebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('league', {
        url: '/league',
        template: '<league></league>'
      });
  });

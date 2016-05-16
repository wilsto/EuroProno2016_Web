'use strict';

angular.module('euroProno2016WebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('arena', {
        url: '/arena',
        template: '<arena></arena>'
      });
  });

'use strict';

angular.module('euroProno2016WebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rules', {
        url: '/rules',
        template: '<rules></rules>'
      });
  });

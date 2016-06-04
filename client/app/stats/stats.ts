'use strict';

angular.module('euroProno2016WebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stats', {
        url: '/stats',
        template: '<stats></stats>'
      });
  });

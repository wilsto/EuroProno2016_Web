'use strict';

angular.module('euroProno2016WebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('euro2016', {
        url: '/euro2016',
        template: '<euro-2016></euro-2016>'
      });
  });

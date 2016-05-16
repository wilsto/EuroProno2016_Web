'use strict';

angular.module('euroProno2016WebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newsedit', {
        url: '/newsedit',
        template: '<newsedit></newsedit>'
      });
  });

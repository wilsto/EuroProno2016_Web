'use strict';

angular.module('euroProno2016WebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('prono', {
                url: '/prono',
                template: '<prono></prono>'
            });
    });

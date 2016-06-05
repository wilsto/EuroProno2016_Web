'use strict';

angular.module('euroProno2016WebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('prono', {
                url: '/prono',
                template: '<prono></prono>'
            })
            .state('pronoUser', {
                url: '/prono/:userId',
                template: '<prono></prono>'
            });
    });

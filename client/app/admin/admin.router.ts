'use strict';

angular.module('euroProno2016WebApp.admin')
    .config(function($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'vm',
                authenticate: 'admin'
            });
    });

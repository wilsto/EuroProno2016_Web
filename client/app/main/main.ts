/// <reference path="../../typings/tsd.d.ts" />
'use strict';

angular.module('euroProno2016WebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                template: '<main></main>'
            });
    });

;
(function() {

    $(document).mouseup(function(e) {
        var container = $('.login');
        // if the target of the click isn't the container...
        // ... nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });

}());

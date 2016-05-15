/// <reference path="../../typings/tsd.d.ts" />
'use strict';
(function() {

    class RegulationComponent {
        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Regulations', href: '/regulation', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Matchs', href: '/match', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Teams', href: '/team', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];
        constructor() {
            this.message = 'Hello';
        }
    }

    angular.module('euroProno2016WebApp')
        .component('regulation', {
            templateUrl: 'app/regulation/regulation.html',
            controller: RegulationComponent,
            controllerAs: 'vm'
        });

})();

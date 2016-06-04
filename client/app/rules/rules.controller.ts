'use strict';
(function() {

    class RulesComponent {
        menu = [
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Leagues', href: '/league', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Rules', href: '/rules', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Stats', href: '/stats', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor() {
            this.message = 'Hello';
        }
    }

    angular.module('euroProno2016WebApp')
        .component('rules', {
            templateUrl: 'app/rules/rules.html',
            controller: RulesComponent,
            controllerAs: 'vm'
        });

})();

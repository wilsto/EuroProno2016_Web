'use strict';
(function() {

    class ArenaComponent {

        menu = [
            { name: 'Arena', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Leagues', href: '/league', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Players', href: '/player', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];
        constructor() {
            this.message = 'Hello';
        }
    }

    angular.module('euroProno2016WebApp')
        .component('arena', {
            templateUrl: 'app/arena/arena.html',
            controller: ArenaComponent,
            controllerAs: 'vm'
        });

})();

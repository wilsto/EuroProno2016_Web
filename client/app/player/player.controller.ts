'use strict';
(function() {

    class PlayerComponent {
        menu = [
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Leagues', href: '/league', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Players', href: '/player', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Rules', href: '/rules', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Stats', href: '/stats', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor(User, $http) {
            this.$http = $http;
            this.users = [];
            this.loadUsers();

            this.loadLeagues();
        }

        loadUsers() {
            this.$http.get('/api/users/list').then(responseUsers => {
                this.users = responseUsers.data;
                console.log('this.users', this.users);
            });
        }

        loadLeagues() {
            this.$http.get('/api/leagues').then(responseLeagues => {
                this.leagues = responseLeagues.data;
                console.log('this.leagues', this.leagues);
            });
        }

    }

    angular.module('euroProno2016WebApp')
        .component('player', {
            templateUrl: 'app/player/player.html',
            controller: PlayerComponent,
            controllerAs: 'vm'
        });

})();

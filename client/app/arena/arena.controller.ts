'use strict';
(function() {

    class ArenaComponent {
        menu = [
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Leagues', href: '/league', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Players', href: '/player', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Rules', href: '/rules', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Stats', href: '/stats', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor($http, Auth) {
            this.$http = $http;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.currentUser = this.getCurrentUser();
        }

        $onInit() {
            var that = this;
            this.getCurrentUser(function(user) {
                that.playerId = user._id; // recupère le nom de l'utilisateur
                that.loadLeagues();
            });
        }

        loadLeagues() {
            //on récupère les matchs
            this.$http.get('/api/leagues').then(responseLeagues => {
                this.leagues = responseLeagues.data;
                console.log('this.leagues', this.leagues);
            });
        }


        loadLeagueDet(myid) {
            //on récupère les details de la ligue
            this.$http.get('/api/leagues/' + myid).then(responseLeagues => {
                this.leaguesdet
 = responseLeagues.data;
                this.members = this.leaguesdet.members;
                this.currentuserId = this.getCurrentUser()._id || 'not logged In';

                // Est ce que le joueur est dans la ligue présente
                this.isInLeague = _.filter(this.members, (member) => {
                    return member.user._id === this.currentuserId;
                }).length > 0;
            });
        }

    }

    angular.module('euroProno2016WebApp')
        .component('arena', {
            templateUrl: 'app/arena/arena.html',
            controller: ArenaComponent,
            controllerAs: 'vm'
        });

})();

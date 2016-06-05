'use strict';
(function() {

    class LeagueComponent {
        menu = [
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Leagues', href: '/league', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Players', href: '/player', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Rules', href: '/rules', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Stats', href: '/stats', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];



        constructor($http, Auth, $scope) {
            this.$http = $http;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.leagues = [];
            this.orderProp = ['name'];
            this.myList = false;
            this.myId = 1;
            $scope.sort = function(type) {
                this.orderProp = type;
            };
        }

        $onInit() {
            this.loadLeagues();
        }

        loadLeagues() {

            //on récupère les matchs
            this.$http.get('/api/leagues').then(responseLeagues => {
                this.leagues = responseLeagues.data;
                console.log('this.leagues', this.leagues);
            });
        }

        // create league 
        createLeague(form) {
            if (form.$valid) {
                this.$http.post('/api/leagues', {
                    name: this.newleague.name,
                    status: this.newleague.status,
                    type: this.newleague.type,
                    description: this.newleague.description,
                    image: this.newleague.image,
                    owner_id: this.getCurrentUser()._id,
                    members: [{ user: this.getCurrentUser()._id, validated: true }]
                }).then(response => {
                    this.newleague.name = '';
                    this.newleague.status = '';
                    this.newleague.type = '';
                    this.newleague.description = '';
                    this.newleague.image = '';
                    this.newleague.owner = '';
                    this.loadLeagues();
                    this.showNew = false;
                });
            }
        }
    }

    angular.module('euroProno2016WebApp')
        .component('league', {
            templateUrl: 'app/league/league.html',
            controller: LeagueComponent,
            controllerAs: 'vm'
        });
})();

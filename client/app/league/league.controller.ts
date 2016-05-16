'use strict';
(function() {

    class LeagueComponent {
        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Euro2016', href: '/team', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor($http, Auth, $scope) {
            this.$http = $http;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.leagues = [];
            this.orderProp = 'name';
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

                this.newleague = _.map(this.leagues, league => {
                    league.owner = this.loadUser(league.owner_id);
                    return league;
                });
                console.log("users news", this.newleague);
            });
        }


        loadUser(id) {
            //on récupère les matchs
            this.$http.get('/api/users/' + id).then(responseUsers => {
                this.owner = responseUsers.data.name;
                console.log("owner", this.owner);
            });
        }




        // openList
        openList(id) {
            this.myList = true;
            this.myId = id;
            console.log("Leagues", id);
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
                    owner_id: this.getCurrentUser()._id
                }).then(response => {
                    this.newleague.name = '';
                    this.newleague.status = '';
                    this.newleague.type = '';
                    this.newleague.description = '';

                    this.newleague.image = '';
                    this.newleague.owner = '';

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

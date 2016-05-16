'use strict';
(function() {

    class LeaguedetailsComponent {
        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Euro2016', href: '/team', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'List', href: '/league', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor($http, Auth, $location) {
            this.$http = $http;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.leaguesdet = [];
            this.$location = $location;
        }
        $onInit() {

            this.path = this.$location.$$path.split("/");
            this.path.length
            console.log("location", this.path[eval(this.path.length - 1)]);
            this.loadLeagueDet(this.path[2]); - 1
        }

        loadLeagueDet(myid) {
            //on récupère les matchs
            this.$http.get('/api/leagues/' + myid).then(responseLeagues => {
                this.leaguesdet = responseLeagues.data;
                this.members = this.leaguesdet.members;
                console.log("leagueDET", this.members);
            });
        }
    }

    angular.module('euroProno2016WebApp')
        .component('leaguedetails', {
            templateUrl: 'app/leaguedetails/leaguedetails.html',
            controller: LeaguedetailsComponent,
            controllerAs: 'vm'
        });

})();

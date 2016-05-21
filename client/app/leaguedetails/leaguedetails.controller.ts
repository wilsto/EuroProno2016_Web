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
            //on récupère les details de la ligue
            this.$http.get('/api/leagues/' + myid).then(responseLeagues => {
                this.leaguesdet = responseLeagues.data;
                this.members = this.leaguesdet.members;
                this.currentuser = this.getCurrentUser()._id;
            });
        }

        //joindre une league
        JoinLeague() {
            var currentuser = this.getCurrentUser()._id;
            _.remove(this.members, function(member) {
                return member.user_id._id === currentuser;
            })

            if (this.leaguesdet.status === 1) {
                this.members.push({ user_id: this.getCurrentUser(), activated: false });
            } else {
                this.members.push({ user_id: this.getCurrentUser(), activated: true });
            }

            this.leaguesdet.members = this.members;

            this.$http.put('/api/leagues/' + this.leaguesdet._id, this.leaguesdet).then(response => {
                console.log('league updated', response);
                this.loadLeagueDet(this.leaguesdet._id);
            });


        }

        //supprimer un membre
        RemoveMember(id) {

                _.remove(this.members, function(member) {
                    return member.user_id._id === id;
                });
                this.leaguesdet.members = this.members;
                this.$http.put('/api/leagues/' + this.leaguesdet._id, this.leaguesdet).then(response => {
                    console.log('member list updated', response);
                });
            }
            //supprimer un membre
        AcceptMember(id) {
            _.forEach(this.members, function(value, key) {
                if (value.user_id._id === id) { value.activated = !value.activated; }
            });
            this.leaguesdet.members = this.members;

            this.$http.put('/api/leagues/' + this.leaguesdet._id, this.leaguesdet).then(response => {
                console.log('member approved', response);

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

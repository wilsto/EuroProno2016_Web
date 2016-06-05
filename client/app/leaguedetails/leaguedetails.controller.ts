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
            this.path = this.$location.$$path.split('/');
            this.loadLeagueDet(this.path[2]);
        }

        loadLeagueDet(myid) {
            //on récupère les details de la ligue
            this.$http.get('/api/leagues/' + myid).then(responseLeagues => {
                this.leaguesdet = responseLeagues.data;
                this.members = this.leaguesdet.members;
                this.currentuserId = this.getCurrentUser()._id || 'not logged In';

                // Est ce que le joueur est dans la ligue présente
                this.isInLeague = _.filter(this.members, (member) => {
                    return member.user._id === this.currentuserId;
                }).length > 0;
            });
        }

        pinLeague() {
            this.leaguesdet.pinned = !this.leaguesdet.pinned;
        }

        saveLeague() {
            this.$http.put('/api/leagues/' + this.leaguesdet._id, this.leaguesdet).then(response => {
                console.log('save league');
                this.loadLeagueDet(this.path[2]);
                this.modify = false;
            });
        }

        deleteLeague() {
            this.$http.delete('/api/leagues/' + this.leaguesdet._id).then(response => {
                this.$location.url('/league');
            });
        }

        //joindre une league
        joinLeague() {
            this.$http.put('/api/leagues/' + this.leaguesdet._id + '/members', { user: this.currentuserId, validated: this.leaguesdet.status !== 1 }).then(response => {
                console.log('league updated');
                this.loadLeagueDet(this.leaguesdet._id);
            });
        }

        //supprimer un membre
        removeMember(memberId) {
            console.log(' { user: memberId }', { user: memberId });
            this.$http.put('/api/leagues/' + this.leaguesdet._id + '/removeMembers', { user: memberId }).then(response => {
                console.log('member list updated');
                this.loadLeagueDet(this.leaguesdet._id);
            });
        }

        //supprimer un membre
        AcceptMember(member) {
            this.valDate = (!member.validated) ? new Date() : null;
            this.$http.put('/api/leagues/' + this.leaguesdet._id + '/members', { user: member.user._id, validated: !member.validated, validationDate: this.valDate }).then(response => {
                console.log('member approved');
                this.loadLeagueDet(this.leaguesdet._id);
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

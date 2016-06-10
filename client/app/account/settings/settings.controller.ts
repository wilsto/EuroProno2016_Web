/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

class SettingsController {

    menu = [
        { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
        { name: 'Euro2016', href: '/news', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
        { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
        { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
    ];

    constructor(Auth, $http) {
        this.errors = {};
        this.obj = {};
        this.submitted = false;
        this.Auth = Auth;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$http = $http;
        this.leagues = [];
        this.focused = false;
        //users information
        this.currentUser = this.getCurrentUser();
        //on récupère les leagues
        this.getUpdStat();
    }


    getUpdStat() {
        // test si league renseignée
        this.$http.get('/api/leagues').then(responseLeagues => {
            var allLeagues = responseLeagues.data;

            this.leagues = _.filter(allLeagues, function(o) {
                return o.name !== 'Public League';
            });

            var members = _.flatten(_.map(this.leagues, 'members'));
            var membersId = _.map(members, 'user');
            var presUser = membersId.indexOf(this.currentUser._id);

            if (presUser !== -1) {
                this.currentUser.status.league = 1;
            } else {
                this.currentUser.status.league = 0;
            }
            // game validated
            this.Championsleagues = _.filter(allLeagues, function(o) {
                return o.name === 'Champions league';
            });


            var clMembers = _.flatten(_.map(this.Championsleagues, 'members'));
            var clMembersId = _.map(clMembers, function(value, key) {
                if (value.validated === true) {
                    return value.user;
                }
            });
            var clPresUser = clMembersId.indexOf(this.currentUser._id);

            if (clPresUser !== -1) {
                this.currentUser.status.game = 1;
            } else {
                this.currentUser.status.game = 0;
            }

        });

        // test si Finale renseignée
        this.$http.get('/api/pronos/user_id/' + this.currentUser._id).then(responseProno => {
            if (responseProno.data[0] !== undefined) {
                this.prono = responseProno.data[0];
                this.final = _.find(this.prono.matchs, function(o) {
                    return o.group === 'Final';
                });
                if (this.final.winner !== undefined && this.final.winner !== null) {
                    this.currentUser.status.prono = 1;
                } else {
                    this.currentUser.status.prono = 0;
                }
            } else {
                this.currentUser.status.prono = 0;
            }
        });

        this.$http.put('/api/users/' + this.currentUser._id, this.currentUser).then(response => {
            console.log('user updated', response);
            this.currentUser = this.getCurrentUser();
        });
    }

    changePassword(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {
                    this.message = 'Password successfully changed.';
                })
                .catch(() => {
                    form.password.$setValidity('mongoose', false);
                    this.errors.other = 'Incorrect password';
                    this.message = '';
                });
        }
    }

    test() {
        console.log('tets');
    }



    saveUser() {
        this.currentUser.status.profil = 1;
        this.$http.put('/api/users/' + this.currentUser._id, this.currentUser).then(response => {
            console.log('user profil updated ', response);
            this.currentUser = this.getCurrentUser();
        });
        this.focused = false;
    }
}

angular.module('euroProno2016WebApp')
    .controller('SettingsController', SettingsController);

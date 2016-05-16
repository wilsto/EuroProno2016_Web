/// <reference path="../../typings/tsd.d.ts" />
'use strict';
(function() {

    class TraductionComponent {

        menu = [
            { name: 'Users', href: '/admin', section: '', ngclick: '', class: '', a_class: 'nothing' },
            { name: 'News', href: '/newsedit', section: '', ngclick: '', class: '', a_class: 'nothing' },
            { name: 'Traduction', href: '/traduction', section: '', ngclick: '', class: 'active', a_class: 'nothing' }
        ];

        constructor($http, $ngBootbox) {
            this.$ngBootbox = $ngBootbox;
            this.$http = $http;
            this.trads = [];
            this.filterBln = true;
        }

        $onInit() {
            console.log('init');

            // on récupère les pronos du joueur sinon on crèe le squelette
            this.$http.get('/api/traductions').then(response => {
                try {
                    this.trads = _.sortBy(response.data, ['page', 'en']);
                } catch (err) {
                    console.log(err);
                }
            });
        }

        addTrad() {
            this.trads.push({ 'page': '', 'en': '', 'fr': '', 'de': '', 'es': '' });
        }

        showFilter() {
            this.filterBln = !this.filterBln;
        }

        tradChange(trad) {
            trad.active = false;
        }

        //sauvegarde les pronos
        save(trad) {
            // si trad existe déjà
            trad.active = true;
            if (trad._id) {
                this.$http.put('/api/traductions/' + trad._id, trad).then(response => {
                    trad = response.data;
                });
            } else {
                // sinon on crèe les trads
                this.$http.post('/api/traductions', trad).then(response => {
                    trad = response.data;
                });
            }
        }

        delete(trad, index) {
            this.trads.splice(index, 1);
            this.$http.delete('/api/traductions/' + trad._id).then(response => {
                console.log('delete', response);
            });
        }

    }

    angular.module('euroProno2016WebApp')
        .component('traduction', {
            templateUrl: 'app/traduction/traduction.html',
            controller: TraductionComponent,
            controllerAs: 'vm'
        });

})();

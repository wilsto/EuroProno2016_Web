'use strict';
(function() {

    class NewseditComponent {
        menu = [
            { name: 'Users', href: '/admin', section: '', ngclick: '', class: '', a_class: 'nothing' },
            { name: 'News', href: '/newsedit', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Traduction', href: '/traduction', section: '', ngclick: '', class: '', a_class: 'nothing' }
        ];

        types = [{
            id: 1,
            name: '1- App EuroProno2016'
        }, {
            id: 2,
            name: '2- News Competition'
        }, {
            id: 5,
            name: '5- Caroussel'
        }];


        constructor($http, $ngBootbox) {
            this.$ngBootbox = $ngBootbox;
            this.$http = $http;
            this.news = [];
        }

        $onInit() {
            console.log('init');
            this.loadNews();
        }

        addNews() {
            this.news.push({});
        }

        loadNews() {
            this.$http.get('/api/newss').then(response => {
                this.news = _.sortBy(response.data, 'date').reverse();
            });
        }

        newsChange(info) {
            console.log('info', info);
            info.active = false;
        }

        //sauvegarde les pronos
        save(info) {
            // si info existe déjà
            info.active = true;
            if (info._id) {
                this.$http.put('/api/newss/' + info._id, info).then(response => {
                    info = response.data;
                });
            } else {
                // sinon on crèe les infos
                this.$http.post('/api/newss', info).then(response => {
                    info = response.data;
                });
            }
        }

        delete(news, index) {
            this.news.splice(index, 1);
            this.$http.delete('/api/newss/' + news._id).then(response => {
                console.log('delete', response);
            });
        }
    }

    angular.module('euroProno2016WebApp')
        .component('newsedit', {
            templateUrl: 'app/newsedit/newsedit.html',
            controller: NewseditComponent,
            controllerAs: 'vm'
        });

})();

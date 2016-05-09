/// <reference path="../../typings/tsd.d.ts" />
'use strict';
(function() {

    class NewsComponent {

        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Admin Users', href: '/admin', section: '', ngclick: '', class: 'active', a_class: 'nothing' }
        ];

        constructor($http, $ngBootbox) {
            this.$ngBootbox = $ngBootbox;
            this.$http = $http;
            this.news = [];
        }

        $onInit() {
                console.log('init');


                // on récupère les pronos du joueur sinon on crèe le squelette
                this.$http.get('/api/newss').then(response => {
                    try {

                        this.news = response.data;

                        // création des groupes à partir des infos news
                        this.types = _.sortBy(_.uniq(_.map(this.news, element => {
                            return { type: element.type, order: element.type, group: element.group };
                        }), 'type'), 'order');
                        console.log("typeone", this.types);
                        // création des type1 à partir des infos news
                        // this.typones = _.sortBy(_.uniq(_.map(this.news, element => {
                        //     return element.type = "1";
                        // }), 'group'), 'group');
                        // 



                    } catch (err) {
                        console.log('vide');
                    }
                });
            }
            // create news 
        createNews(form) {
            // si trad existe déjà
            console.log(form.$valid);
            if (form.$valid) {

                this.$http.post('/api/newss', {
                    type: this.newinfo.type,
                    group: this.newinfo.group,
                    title: this.newinfo.title,
                    info: this.newinfo.info,
                    image: this.newinfo.image
                }).then(response => {
                    this.newinfo.type = '';
                    this.newinfo.group = '';
                    this.newinfo.title = '';
                    this.newinfo.info = '';
                    this.newinfo.image = '';
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
        .component('news', {
            templateUrl: 'app/news/news.html',
            controller: NewsComponent,
            controllerAs: 'vm'
        });

})();

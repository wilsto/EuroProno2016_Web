/// <reference path="../../typings/tsd.d.ts" />
'use strict';

(function() {

    class MainController {
        bg_audio = true;
        // TODO change to false to not start music
        audioOn = false;
        bg = new Audio('assets/audio/bg.mp3');

        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Euro2016', href: '/news', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor($http, $scope, socket, Auth) {
            this.$http = $http;
            this.socket = socket;
            this.awesomeThings = [];
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
        }

        $onInit() {
            console.log('init');

            this.$http.get('/api/things').then(response => {
                this.awesomeThings = response.data;
                this.socket.syncUpdates('thing', this.awesomeThings);
            });

            if (this.bg_audio && this.audioOn) {
                this.bg.play();
            }

            this.parallax();

            // Animations
            this.homeAnimate();
            this.introAnimate();
            this.servicesAnimate();
            this.aboutAnimate();
            this.countersAnimate();
            this.contactAnimate();
        }

        $onDestroy() {
            console.log('destroy');
            this.socket.unsyncUpdates('thing');

            //arrete la musique lorsque l'on quitte le main
            this.bg.pause();
            this.bg.currentTime = 0;
        }

        addThing() {
            if (this.newThing) {
                this.$http.post('/api/things', { name: this.newThing });
                this.newThing = '';
            }
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }

        // Parallax
        parallax() {
            $(window).stellar();
            console.log('parallax');
        }


        // Animations
        homeAnimate() {
            console.log('homeAnimate');
            if ($('#ep2016-home').length > 0) {
                $('#ep2016-home').waypoint(function(direction) {
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        setTimeout(function() {
                            $('#ep2016-home .to-animate').each(function(k) {
                                var el = $(this);
                                setTimeout(function() {
                                    el.addClass('fadeInUp animated');
                                }, k * 200, 'easeInOutExpo');
                            });
                        }, 0);
                        $(this.element).addClass('animated');
                    }
                }, { offset: '80%' });
            }
        }

        introAnimate() {
            if ($('#ep2016-intro').length > 0) {
                $('#ep2016-intro').waypoint(function(direction) {
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        setTimeout(function() {
                            $('#ep2016-intro .to-animate').each(function(k) {
                                var el = $(this);
                                setTimeout(function() {
                                    el.addClass('fadeInRight animated');
                                }, k * 200, 'easeInOutExpo');
                            });
                        }, 0);
                        $(this.element).addClass('animated');
                    }
                }, { offset: '80%' });
            }
        }

        servicesAnimate() {
            var services = $('#ep2016-services');
            if (services.length > 0) {
                services.waypoint(function(direction) {
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        var sec = services.find('.to-animate').length,
                            sec = parseInt((sec * 200) + 400);
                        setTimeout(function() {
                            services.find('.to-animate').each(function(k) {
                                var el = $(this);
                                setTimeout(function() {
                                    el.addClass('fadeInUp animated');
                                }, k * 200, 'easeInOutExpo');

                            });
                        }, 200);

                        setTimeout(function() {
                            services.find('.to-animate-2').each(function(k) {
                                var el = $(this);
                                setTimeout(function() {
                                    el.addClass('bounceIn animated');
                                }, k * 200, 'easeInOutExpo');
                            });
                        }, sec);

                        $(this.element).addClass('animated');
                    }
                }, { offset: '80%' });

            }
        }

        aboutAnimate() {
            var about = $('#ep2016-about');
            if (about.length > 0) {
                about.waypoint(function(direction) {
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        setTimeout(function() {
                            about.find('.to-animate').each(function(k) {
                                var el = $(this);
                                setTimeout(function() {
                                    el.addClass('fadeInUp animated');
                                }, k * 200, 'easeInOutExpo');
                            });
                        }, 200);
                        $(this.element).addClass('animated');
                    }
                }, { offset: '80%' });
            }
        }

        countersAnimate() {
            var counters = $('#ep2016-counters');
            if (counters.length > 0) {
                counters.waypoint(function(direction) {
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        var sec = counters.find('.to-animate').length,
                            sec = parseInt((sec * 200) + 400);

                        setTimeout(function() {
                            counters.find('.to-animate').each(function(k) {
                                var el = $(this);

                                setTimeout(function() {
                                    el.addClass('fadeInUp animated');
                                }, k * 200, 'easeInOutExpo');

                            });
                        }, 200);

                        setTimeout(function() {
                            counters.find('.js-counter').countTo({
                                formatter: function(value, options) {
                                    return value.toFixed(options.decimals);
                                },
                            });
                        }, 400);

                        setTimeout(function() {
                            counters.find('.to-animate-2').each(function(k) {
                                var el = $(this);

                                setTimeout(function() {
                                    el.addClass('bounceIn animated');
                                }, k * 200, 'easeInOutExpo');

                            });
                        }, sec);

                        $(this.element).addClass('animated');
                    }
                }, { offset: '80%' });
            }
        }


        contactAnimate() {
            var contact = $('#ep2016-contact');
            if (contact.length > 0) {
                contact.waypoint(function(direction) {
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        setTimeout(function() {
                            contact.find('.to-animate').each(function(k) {
                                var el = $(this);
                                setTimeout(function() {
                                    el.addClass('fadeInUp animated');
                                }, k * 200, 'easeInOutExpo');
                            });
                        }, 200);
                        $(this.element).addClass('animated');
                    }
                }, { offset: '80%' });
            }
        }
    }

    angular.module('euroProno2016WebApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController,
            controllerAs: 'vm'
        });

})();

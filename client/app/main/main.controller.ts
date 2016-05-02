/// <reference path="../../typings/tsd.d.ts" />
'use strict';

(function() {

    class MainController {
        bg_audio = true;
        // TODO change to false to not start music
        audioOn = false;
        bg = new Audio('assets/audio/bg.mp3');

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
            this.burgerMenu();
            this.clickMenu();
            this.windowScroll();

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

        toggle_audio() {
            console.log('toggle');
            this.bg.muted = !this.bg.muted;
            this.audioOn = !this.bg.muted;
        }

        login_click() {
            console.log('cllick');
            $('.login').fadeToggle('slow');
        }

        // Parallax
        parallax() {
            $(window).stellar();
            console.log('parallax');
        }

        // Burger Menu
        burgerMenu() {
            $('body').on('click', '.js-ep2016-nav-toggle', function(event) {
                event.preventDefault();
                if ($('#navbar').is(':visible')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });
        }

        // Page Nav
        clickMenu() {
            $('#navbar a:not([class="external"])').click(function(event) {
                var section = $(this).data('nav-section'),
                    navbar = $('#navbar');

                if ($('[data-section="' + section + '"]').length) {
                    $('html, body').animate({
                        scrollTop: $('[data-section="' + section + '"]').offset().top
                    }, 500);
                }

                if (navbar.is(':visible')) {
                    navbar.removeClass('in');
                    navbar.attr('aria-expanded', 'false');
                    $('.js-ep2016-nav-toggle').removeClass('active');
                }

                event.preventDefault();
                return false;
            });
        }

        // Reflect scrolling in navigation
        navActive(section) {
            var $el = $('#navbar > ul');
            $el.find('li').removeClass('active');
            $el.each(function() {
                $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
            });
        }

        navigationSection() {
            var $section = $('section[data-section]');
            $section.waypoint(function(direction) {
                console.log('direction', direction);
                if (direction === 'down') {
                    navActive($(this.element).data('section'));
                }
            }, {
                offset: '150px'
            });
            $section.waypoint(function(direction) {
                if (direction === 'up') {
                    navActive($(this.element).data('section'));
                }
            }, {
                offset: function() {
                    return -$(this.element).height() + 155;
                }
            });
        }

        // Window Scroll
        windowScroll() {
            console.log('windowScroll');
            $(window).scroll(function(event) {
                var header = $('#ep2016-header'),
                    scrlTop = $(this).scrollTop();
                if (scrlTop > 500 && scrlTop <= 2000) {
                    header.addClass('navbar-fixed-top ep2016-animated slideInDown');
                } else if (scrlTop <= 500) {
                    if (header.hasClass('navbar-fixed-top')) {
                        header.addClass('navbar-fixed-top ep2016-animated slideOutUp');
                        setTimeout(function() {
                            header.removeClass('navbar-fixed-top ep2016-animated slideInDown slideOutUp');
                        }, 100);
                    }
                }
            });
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
            controller: MainController
        });

})();

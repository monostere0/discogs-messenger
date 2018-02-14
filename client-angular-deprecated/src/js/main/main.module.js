angular.module('discogs.main', [
  'ui.router',
  'ngAnimate',
  'ngMessages',
  'duScroll',
  'pascalprecht.translate',
  'discogs.messenger'
])
  /*@ngInject*/
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('root', {
        url: '/',
        /*@ngInject*/
        resolve: {identity: (userService) => {
            return userService.identity();
          }
        },
        controllerAs: '$resolve',
        /*@ngInject*/
        controller(identity) {
          this.isLoggedIn = !!identity;
        },
        template: `<discogs-login is-logged-in="$resolve.isLoggedIn"></discogs-login>
        <discogs-messenger ng-if="$resolve.isLoggedIn"></discogs-messenger>`
      });
  });

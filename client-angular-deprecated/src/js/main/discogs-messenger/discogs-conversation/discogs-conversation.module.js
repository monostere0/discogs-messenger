angular
  .module('discogs.messenger.conversation', [])
  /*@ngInject*/
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('root.conversation', {
        url: '/conversation/:id',
        views: {
          'conversations': {
            template: `<discogs-conversation></discogs-conversation>`
          }
        }
      });
  });

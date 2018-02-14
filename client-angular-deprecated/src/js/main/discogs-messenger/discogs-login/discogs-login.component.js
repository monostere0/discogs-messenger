angular
  .module('discogs.messenger.login')
  .component('discogsLogin', discogsLogin());

function discogsLogin() {
  return {
    bindings: {
      isLoggedIn: '<'
    },
    template: `<div class="d-login" ng-if="!$ctrl.isLoggedIn">
      <form name="login" class="d-login__container">
        <h1>Hi there! Login to start using the application.</h1>
        <a class="button" href="/api/auth">Login using Discogs</a>
      </form>
    </div>`
  };
}
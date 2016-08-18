angular
  .module('discogs.messenger.menu')
  .component('discogsMenu', discogsMenu());

function discogsMenu() {
  return {
    template: `<div class="d-menu">
    </div>`
  };
}
angular
  .module('discogs.messenger')
  .component('discogsMessenger', discogsMessenger());

function discogsMessenger() {
  return {
    template: `
    <div class="d-container">
      <discogs-messages-list></discogs-messages-list>
      <div ui-view="conversations" class="d-container__conversations"></div>
    </div>`
  };
}

angular
  .module('discogs.messenger.conversation')
  .component('discogsConversation', discogsConversation());

function discogsConversation() {
  return {
    /*@ngInject*/
    controller(messagesService, $stateParams) {
      const $ctrl = this;
      $ctrl.$onInit = function() {
        $ctrl.entries = messagesService.getConversation($stateParams.id);
      };
    },
    template: `<div class="d-conversation">
      <div class="d-conversation__body">
        <ul class="d-conversation__body__messages">
          <li class="d-conversation__body__messages__message"
              ng-class="{'d-conversation__body__messages__message--outbound': entry.outbound}"
              ng-repeat="entry in $ctrl.entries">
            {{entry.message}}
          </li>
        </ul>
      </div>
      <div class="d-conversation__write">
        <form>
          <input type="text" class="d-conversation__write__text" />
          <button class="d-conversation__write__send button">Send</button>
        </form>
      </div>
    </div>`
  };
}
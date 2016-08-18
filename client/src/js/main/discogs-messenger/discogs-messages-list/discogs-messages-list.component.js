angular
  .module('discogs.messenger.messages-list')
  .component('discogsMessagesList', discogsMessagesList());

function discogsMessagesList() {
  return {
    /*@ngInject*/
    controller(messagesService) {
      const $ctrl = this;
      $ctrl.$onInit = function() {
        messagesService
          .getMessagesList()
          .then(messages => $ctrl.messages = messages);
      };
    },
    template: `<div class="d-messages-list">
      <ul class="d-messages-list__list">
        <li class="d-messages-list__list__message"
            ng-repeat="message in $ctrl.messages"
            ui-sref="root.conversation({id:message.id})"
            ui-sref-active="d-messages-list__list__message--active">
            <img  class="d-messages-list__list__message__avatar" ng-src="{{message.avatar}}" width="50" height="50" />
            <div class="d-messages-list__list__message__info">
              <span class="d-messages-list__list__message__info__author">{{message.from}}</span>
              <span class="d-messages-list__list__message__info__preview">{{message.preview}}</span>
            </div>
            <span class="d-messages-list__list__message__received">{{message.received | date:'HH:mm'}}</span>
        </li>
      </ul>
    </div>`
  };
}

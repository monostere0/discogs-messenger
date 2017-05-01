describe('js/main/discogs-conversation/discogs-conversation.component', () => {
  let component, scope;
  beforeEach(module('discogs.messenger'));
  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    component = $compile(angular.element('<discogs-conversation />'))(scope);
    scope.$apply();
  }));

  it('should render the component', () => {
    const template = component.html();
    const scope = component.isolateScope();
    console.info(template.find('.d-conversation__body__messages__message'));
  });
});

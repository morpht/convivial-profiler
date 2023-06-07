// Test for Convivial Profiler Type profiler

describe('Type Profiler: Test 01', () => {
    it('1. Set the type metatag to storage dimensions and fire a dataLayer event.'
        , () => {
        // Open the type profiler page.
        cy.visit(Cypress.env('baseUrl') + 'type.html');
        cy.getLocalStorage('type_top')
          .then($type => {
            expect($type).to.equal('article')
          })
        // Verify the dataLayer event.
        cy.window().then((win) => {
          assert.equal(win.dataLayer[0].action, 'view');
          assert.equal(win.dataLayer[0].category, 'type');
          assert.equal(win.dataLayer[0].event, 'convivialProfiler.event');
          assert.equal(win.dataLayer[0].label, 'article');
          assert.equal(win.dataLayer[0].value, 1);
        });
    })
});

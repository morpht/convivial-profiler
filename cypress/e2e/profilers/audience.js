// Test for Convivial Profiler Audience profiler

describe('Audience Profiler: Test 01', () => {
    it('1. Set the audience metatag to storage dimensions and fire a dataLayer event.'
        , () => {
        // Open the audience profiler page.
        cy.visit(Cypress.env('baseUrl') + 'audience.html');
        cy.getLocalStorage('audience_top')
          .then($audience => {
            expect($audience).to.equal('audience:test')
          })
        // Verify the dataLayer event.
        cy.window().then((win) => {
          assert.equal(win.dataLayer[0].action, 'view');
          assert.equal(win.dataLayer[0].category, 'audience');
          assert.equal(win.dataLayer[0].event, 'convivialProfiler.event');
          assert.equal(win.dataLayer[0].label, 'audience:test');
          assert.equal(win.dataLayer[0].value, 1);
        });
    })
});

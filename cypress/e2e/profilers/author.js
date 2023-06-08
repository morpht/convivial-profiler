// Test for Convivial Profiler Author profiler

describe('Author Profiler: Test 01', () => {
    it('1. Set the author metatag to storage dimensions and fire a dataLayer event.'
        , () => {
        // Open the author profiler page.
        cy.visit(Cypress.env('baseUrl') + 'author.html');
        // Verify the dataLayer event.
        cy.window().then((win) => {
          assert.equal(win.dataLayer[0].action, 'view');
          assert.equal(win.dataLayer[0].category, 'author');
          assert.equal(win.dataLayer[0].event, 'convivialProfiler.event');
          assert.equal(win.dataLayer[0].label, 'person:test');
          assert.equal(win.dataLayer[0].value, 1);
        });
    })
});

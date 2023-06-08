// Test for Convivial Profiler Topic profiler

describe('Topic Profiler: Test 01', () => {
    it('1. Set the topic metatag to storage dimensions and fire a dataLayer event.'
        , () => {
        // Open the topic profiler page.
        cy.visit(Cypress.env('baseUrl') + 'topic.html');
        cy.getLocalStorage('topic_top')
          .then($topic => {
            expect($topic).to.equal('topic:test')
          })
        // Verify the dataLayer event.
        cy.window().then((win) => {
          assert.equal(win.dataLayer[0].action, 'view');
          assert.equal(win.dataLayer[0].category, 'topic');
          assert.equal(win.dataLayer[0].event, 'convivialProfiler.event');
          assert.equal(win.dataLayer[0].label, 'topic:test');
          assert.equal(win.dataLayer[0].value, 1);
        });
    })
});

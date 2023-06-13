// Test for Convivial Profiler Topic param profiler

describe('Topic param Profiler: Test 01', () => {
    it('1. Checks Topic param query parameter and saves to storage.'
        , () => {
        // Open the topic param page.
        cy.visit(Cypress.env('baseUrl') + '?topic=topic:test');
        cy.getLocalStorage('topic_param')
          .then($topic => {
            expect($topic).to.equal('topic:test')
          })
    })
});

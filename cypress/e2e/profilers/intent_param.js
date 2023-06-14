// Test for Convivial Profiler Intent param profiler

describe('Intent param Profiler: Test 01', () => {
    it('1. Checks Intent param query parameter and saves to storage.'
        , () => {
        // Open the intent param page.
        cy.visit(Cypress.env('baseUrl') + '?intent=intent:test');
        cy.getLocalStorage('intent_param')
          .then($intent => {
            expect($intent).to.equal('intent:test')
          })
    })
});

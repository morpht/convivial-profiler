// Test for Convivial Profiler Audience param profiler

describe('Audience param Profiler: Test 01', () => {
    it('1. Checks Audience param query parameter and saves to storage.'
        , () => {
        // Open the audience param page.
        cy.visit(Cypress.env('baseUrl') + '?audience=audience-test');
        cy.getLocalStorage('audience_param')
          .then($audience => {
            expect($audience).to.equal('audience-test')
          })
    })
});

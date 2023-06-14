// Test for Convivial Profiler set param profiler

describe('Set param Profiler: Test 01', () => {
    it('1. Checks set query parameter and saves to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        // Open the set profiler page.
        cy.visit(Cypress.env('baseUrl') + '?set=test');
        cy.getLocalStorage('test')
          .then($test => {
            expect($test).to.equal('1')
          })
    })
});

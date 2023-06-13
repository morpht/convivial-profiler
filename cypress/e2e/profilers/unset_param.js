// Test for Convivial Profiler Unset param profiler

describe('Unset param Profiler: Test 01', () => {
    it('1. Checks unset query parameter and unset it from storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        // Open the unset profiler page.
        cy.visit(Cypress.env('baseUrl') + '?unset=test');
        cy.getLocalStorage('test')
          .then($test => {
            expect($test).to.equal('0')
          })
    })
});

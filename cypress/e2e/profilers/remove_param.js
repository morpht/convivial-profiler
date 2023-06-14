// Test for Convivial Profiler remove param profiler

describe('Remove param Profiler: Test 01', () => {
    it('1. Checks remove query parameter and remove it from storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        // Open the set profiler page.
        cy.visit(Cypress.env('baseUrl') + '?set=test');
        // Ensure the value exist in localStorage prior to removal.
        cy.getLocalStorage('test')
          .then($test => {
            expect($test).to.equal('1')
          })
        // Open the remove profiler page.
        cy.visit(Cypress.env('baseUrl') + '?remove=test');
        cy.getLocalStorage('test')
          .then($test => {
            expect($test).to.equal(null)
          })
    })
});

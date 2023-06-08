// Test for Convivial Profiler UTM medium profiler

describe('UTM medium Profiler: Test 01', () => {
    it('1. Checks utm_medium query parameter and saves to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        // Open the utm_campaign profiler page.
        cy.visit(Cypress.env('baseUrl') + '?utm_medium=medium1');
        cy.getLocalStorage('utm_medium')
          .then($utm_medium => {
            expect($utm_medium).to.equal('medium1')
          })
    })
});

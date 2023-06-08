// Test for Convivial Profiler UTM source profiler

describe('UTM source Profiler: Test 01', () => {
    it('1. Checks utm_source query parameter and saves to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        // Open the utm_campaign profiler page.
        cy.visit(Cypress.env('baseUrl') + '?utm_source=source1');
        cy.getLocalStorage('utm_source')
          .then($utm_source => {
            expect($utm_source).to.equal('source1')
          })
    })
});

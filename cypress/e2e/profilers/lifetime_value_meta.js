// Test for Convivial Profiler Lifetime Value meta profiler

describe('Lifetime Value meta Profiler: Test 01', () => {
    it('1. Set the value metatag to storage dimensions.'
        , () => {
        // Open the price profiler page.
        cy.visit(Cypress.env('baseUrl') + 'price.html');
        cy.getLocalStorage('lifetime_value_meta')
          .then($lifetime_value_meta => {
            expect($lifetime_value_meta).to.equal('5')
          })
    })
});

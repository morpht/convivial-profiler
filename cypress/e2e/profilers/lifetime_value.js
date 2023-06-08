// Test for Convivial Profiler Lifetime Value profiler

describe('Lifetime Value Profiler: Test 01', () => {
    it('1. Set the value metatag to storage dimensions.'
        , () => {
        // Open the price profiler page.
        cy.visit(Cypress.env('baseUrl') + 'price.html');
        cy.getLocalStorage('lifetime_value')
          .then($lifetime_value => {
            expect($lifetime_value).to.equal('5')
          })
    })
});

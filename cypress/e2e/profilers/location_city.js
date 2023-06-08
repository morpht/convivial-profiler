// Test for Convivial Profiler Location city profiler

describe('Location city Profiler: Test 01', () => {
    it('1. Set the location city cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('location_city')
          .then($location_city => {
            expect($location_city).to.equal(null)
          })
        // Set the location city cookie.
        cy.setCookie('cp_city', 'New town', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('location_city')
          .then($location_city => {
            expect($location_city).to.equal('New town')
          })
    })
});

// Test for Convivial Profiler Location longitude profiler

describe('Location longitude Profiler: Test 01', () => {
    it('1. Set the location longitude cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('location_lon')
          .then($location_lon => {
            expect($location_lon).to.equal(null)
          })
        // Set the location longitude cookie.
        cy.setCookie('cp_longitude', '22.0312', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('location_lon')
          .then($location_lon => {
            expect($location_lon).to.equal('22.0312')
          })
    })
});

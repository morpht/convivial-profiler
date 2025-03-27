// Test for Convivial Profiler Location latitude profiler

describe('Location latitude Profiler: Test 01', () => {
    it('1. Set the location latitude cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('location_lat')
          .then($location_lat => {
            expect($location_lat).to.equal(null)
          })
          cy.getLocalStorage('season')
          .then($season => {
            expect($season).to.equal(null)
          })
        // Set the location latitude cookie.
        cy.setCookie('cp_latitude', '22.0312', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('location_lat')
          .then($location_lat => {
            expect($location_lat).to.equal('22.0312')
          })
          cy.getLocalStorage('season')
          .then($season => {
            expect($season).to.equal('spring')
          })
    })
});

// Test for Convivial Profiler Location country profiler

describe('Location country Profiler: Test 01', () => {
    it('1. Set the location country cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('location_country')
          .then($location_country => {
            expect($location_country).to.equal(null)
          })
          cy.getLocalStorage('location_zone')
          .then($location_zone => {
            expect($location_zone).to.equal('zone-australia')
          })
        // Set the location country cookie.
        cy.setCookie('cp_country', 'IN', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('location_country')
          .then($location_country => {
            expect($location_country).to.equal('IN')
          })
          cy.getLocalStorage('location_zone')
          .then($location_zone => {
            expect($location_zone).to.equal('zone-international')
          })
    })
});

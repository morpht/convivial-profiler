// Test for Convivial Profiler Intent cookie profiler

describe('Intent cookie Profiler: Test 01', () => {
    it('1. Set the intent cookie cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('intent_cookie')
          .then($intent_cookie => {
            expect($intent_cookie).to.equal(null)
          })
        // Set the convivial enricher intent cookie.
        cy.setCookie('convivial_enricher_convivial_demo_intent', 'intent:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('intent_cookie')
          .then($intent_cookie => {
            expect($intent_cookie).to.equal('intent:enricher')
          })
    })
});

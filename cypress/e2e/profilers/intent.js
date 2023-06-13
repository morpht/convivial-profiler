// Test for Convivial Profiler Intent bestpick profiler

describe('Intent bestpick Profiler: Test 01', () => {
    it('1. Picks the best intent out from intent meta and audience crm.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('intent')
          .then($intent => {
            expect($intent).to.equal(null)
          })
        // Open the intent profiler page.
        cy.visit(Cypress.env('baseUrl') + 'intent_meta.html');
        cy.getLocalStorage('intent')
          .then($intent => {
            expect($intent).to.equal('intent:test')
          })
        // Set the intent CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_intent', 'intent:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('intent')
          .then($intent => {
            expect($intent).to.equal('intent:enricher')
          })
    })
});

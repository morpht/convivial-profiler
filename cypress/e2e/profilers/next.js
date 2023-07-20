// Test for Convivial Profiler next bestpick profiler

describe('Next bestpick Profiler: Test 01', () => {
    it('1. Picks the best next out from intent and campaign.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('next')
          .then($next => {
            expect($next).to.equal(null)
          })
        // Open the campaign param profiler page.
        cy.visit(Cypress.env('baseUrl') + '?campaign=campaign1');
        cy.getLocalStorage('next')
          .then($next => {
            expect($next).to.equal('campaign1')
          })
          // Open the intent meta profiler page.
        cy.visit(Cypress.env('baseUrl') + 'intent_meta.html');
        cy.getLocalStorage('next')
          .then($next => {
            expect($next).to.equal('campaign1')
          })
        // Set the intent CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_intent', 'intent:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('next')
          .then($next => {
            expect($next).to.equal('intent:enricher')
          })
    })
});

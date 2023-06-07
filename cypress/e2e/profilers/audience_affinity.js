// Test for Convivial Profiler Audience Affinity profiler

describe('Audience Affinity Profiler: Test 01', () => {
    it('1. Picks the best audience out from audience and audience crm.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('audience_affinity')
          .then($audience => {
            expect($audience).to.equal('audience:general')
          })
        // Open the audience profiler page.
        cy.visit(Cypress.env('baseUrl') + 'audience.html');
        cy.getLocalStorage('audience_affinity')
          .then($audience => {
            expect($audience).to.equal('audience:test')
          })
        // Set the audience CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_audience', 'audience:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('audience_affinity')
          .then($audience => {
            expect($audience).to.equal('audience:enricher')
          })
    })
});

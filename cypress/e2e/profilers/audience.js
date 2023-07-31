// Test for Convivial Profiler Audience bestpick profiler

describe('Audience bestpick Profiler: Test 01', () => {
    it('1. Picks the best audience out from audience meta and audience crm.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('audience')
          .then($audience => {
            expect($audience).to.equal('audience:general')
          })
        // Open the audience profiler page.
        cy.visit(Cypress.env('baseUrl') + 'audience_meta.html');
        cy.getLocalStorage('audience')
          .then($audience => {
            expect($audience).to.equal('audience:test')
          })
        // Set the audience CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_audience', 'audience:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('audience')
          .then($audience => {
            expect($audience).to.equal('audience:enricher')
          })
        // Open the audience override page.
        cy.visit(Cypress.env('baseUrl') + '?audience_override=audience:override');
        cy.getLocalStorage('audience')
          .then($audience => {
            expect($audience).to.equal('audience:override')
          })
    })
});

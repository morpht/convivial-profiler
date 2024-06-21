// Test for Convivial Profiler Audience CRM profiler

describe('Audience CRM Profiler: Test 01', () => {
    it('1. Set the audience crm cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('audience_crm')
          .then($audience_crm => {
            expect($audience_crm).to.equal(null)
          })
        // Set the audience CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_audience', 'audience-enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('audience_crm')
          .then($audience_crm => {
            expect($audience_crm).to.equal('audience-enricher')
          })
    })
});

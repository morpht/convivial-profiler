// Test for Convivial Profiler Campaign CRM profiler

describe('Campaign CRM Profiler: Test 01', () => {
    it('1. Set the campaign crm cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('campaign_crm')
          .then($campaign_crm => {
            expect($campaign_crm).to.equal(null)
          })
        // Set the audience CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_campaign', 'campaign_enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('campaign_crm')
          .then($campaign_crm => {
            expect($campaign_crm).to.equal('campaign_enricher')
          })
    })
});

// Test for Convivial Profiler Campaign Affinity profiler

describe('Campaign Affinity Profiler: Test 01', () => {
    it('1. Picks the best campaign out from campaign utm and campaign crm.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('campaign_affinity')
          .then($campaign_affinity => {
            expect($campaign_affinity).to.equal(null)
          })
        // Open the utm_campaign profiler page.
        cy.visit(Cypress.env('baseUrl') + '?utm_campaign=campaign1');
        cy.getLocalStorage('campaign_affinity')
          .then($campaign_affinity => {
            expect($campaign_affinity).to.equal('campaign1')
          })
        // Set the campaign CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_campaign', 'campaign_enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('campaign_affinity')
          .then($campaign_affinity => {
            expect($campaign_affinity).to.equal('campaign_enricher')
          })
    })
});

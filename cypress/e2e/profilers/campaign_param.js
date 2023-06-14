// Test for Convivial Profiler Campaign param profiler

describe('Campaign param Profiler: Test 01', () => {
    it('1. Checks campaign_param query parameter and saves to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        // Open the utm_campaign profiler page.
        cy.visit(Cypress.env('baseUrl') + '?campaign=campaign1');
        cy.getLocalStorage('campaign_param')
          .then($campaign_param => {
            expect($campaign_param).to.equal('campaign1')
          })
    })
});

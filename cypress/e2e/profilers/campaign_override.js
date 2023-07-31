// Test for Convivial Profiler Campaign override profiler

describe('Campaign Override Profiler: Test 01', () => {
  it('1. Checks Campaign override query parameter and saves to storage.'
      , () => {
      // Open the campaign override page.
      cy.visit(Cypress.env('baseUrl') + '?campaign_override=campaign:override');
      cy.getLocalStorage('campaign_override')
        .then($campaign_override => {
          expect($campaign_override).to.equal('campaign:override')
        })
  })
});

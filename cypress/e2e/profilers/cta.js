// Test for Convivial Profiler CTA bestpick profiler

describe('CTA bestpick Profiler: Test 01', () => {
  it('1. Picks the best cta out from booked, outcome, campaign and audience.'
      , () => {
      // open the application.
      cy.visit(Cypress.env('baseUrl'));
      // Default cta should be audience:general
      cy.getLocalStorage('cta')
        .then($cta => {
          expect($cta).to.equal('audience:general')
        })
      // Open the audience meta page.
      cy.visit(Cypress.env('baseUrl') + 'audience_meta.html');
      cy.getLocalStorage('cta')
        .then($cta => {
          expect($cta).to.equal('audience:test')
        })
      // Set the campaign CRM cookie.
      cy.setCookie('convivial_enricher_convivial_demo_campaign', 'campaign_enricher', {
        path: '/'
      });
      // Reload the application.
      cy.reload(true);
      cy.getLocalStorage('cta')
        .then($cta => {
          expect($cta).to.equal('campaign_enricher')
        })
  })
});

// Test for Convivial Profiler UTM campaign profiler

describe('UTM campaign Profiler: Test 01', () => {
    it('1. Checks utm_campaign query parameter and set dataLayer event and saves to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        // Open the utm_campaign profiler page.
        cy.visit(Cypress.env('baseUrl') + '?utm_campaign=campaign1');
        cy.getLocalStorage('campaign_utm')
          .then($campaign_utm => {
            expect($campaign_utm).to.equal('campaign1')
          })
        // Verify the dataLayer event.
        cy.window().then((win) => {
          assert.equal(win.dataLayer[0].action, 'view');
          assert.equal(win.dataLayer[0].category, 'campaign');
          assert.equal(win.dataLayer[0].event, 'convivialProfiler.event');
          assert.equal(win.dataLayer[0].label, 'campaign1');
          assert.equal(win.dataLayer[0].value, 1);
        });
    })
});

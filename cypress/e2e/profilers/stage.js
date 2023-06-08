// Test for Convivial Profiler Stage profiler

describe('Stage Affinity Profiler: Test 01', () => {
    it('1. Picks the current stage based on user visits.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('stage')
          .then($stage => {
            expect($stage).to.equal(null)
          })
        // Open the stage discovery profiler page.
        cy.visit(Cypress.env('baseUrl') + 'stage_discovery.html');
        // Reload the current page.
        cy.reload(true);
        cy.getLocalStorage('stage')
          .then($stage => {
            expect($stage).to.equal('stage:validation')
          })
        // Open the stage validation profiler page.
        cy.visit(Cypress.env('baseUrl') + 'stage_validation.html');
        cy.getLocalStorage('stage')
          .then($stage => {
            expect($stage).to.equal('stage:conversion')
          })
        // Open the stage conversion profiler page.
        cy.visit(Cypress.env('baseUrl') + 'stage_conversion.html');
        // Reload the current page.
        cy.reload(true);
        cy.getLocalStorage('stage')
          .then($stage => {
            expect($stage).to.equal('stage:continue')
          })
        // Open the stage converted profiler page.
        cy.visit(Cypress.env('baseUrl') + 'stage_converted.html');
        cy.getLocalStorage('stage')
          .then($stage => {
            expect($stage).to.equal('stage:continue')
          })
    })
});

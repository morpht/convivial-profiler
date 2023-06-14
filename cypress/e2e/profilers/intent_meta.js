// Test for Convivial Profiler Intent meta profiler

describe('Intent meta Profiler: Test 01', () => {
    it('1. Set the intent metatag to storage dimensions.'
        , () => {
        // Open the intent meta profiler page.
        cy.visit(Cypress.env('baseUrl') + 'intent_meta.html');
        cy.getLocalStorage('intent_top')
          .then($intent => {
            expect($intent).to.equal('intent:test')
          })
    })
});

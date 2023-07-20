// Test for Convivial Profiler Intent recent profiler

describe('Intent recent Profiler: Test 01', () => {
  it('1. Set the intent_key metatag to storage.'
      , () => {
      // Open the intent profiler page.
      cy.visit(Cypress.env('baseUrl') + 'intent_recent.html');
      cy.getLocalStorage('intent_recent')
        .then($intent => {
          expect($intent).to.equal('intent:test')
        })
  })
});

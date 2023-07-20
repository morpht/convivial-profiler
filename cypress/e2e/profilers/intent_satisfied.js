// Test for Convivial Profiler Intent satisfied profiler

describe('Intent satisifed Profiler: Test 01', () => {
  it('1. Remove the intent_recent from storage.'
      , () => {
      // Open the intent profiler page.
      cy.visit(Cypress.env('baseUrl') + 'intent_satisfied.html');
      cy.getLocalStorage('intent_recent')
        .then($intent => {
          expect($intent).to.equal(null)
        })
  })
});

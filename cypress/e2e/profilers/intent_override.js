// Test for Convivial Profiler Intent override profiler

describe('Intent Override Profiler: Test 01', () => {
  it('1. Checks Intent override query parameter and saves to storage.'
      , () => {
      // Open the intent override page.
      cy.visit(Cypress.env('baseUrl') + '?intent_override=intent:override');
      cy.getLocalStorage('intent_override')
        .then($intent_override => {
          expect($intent_override).to.equal('intent:override')
        })
  })
});

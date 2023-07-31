// Test for Convivial Profiler Audience override profiler

describe('Audience Override Profiler: Test 01', () => {
  it('1. Checks Audience override query parameter and saves to storage.'
      , () => {
      // Open the audience override page.
      cy.visit(Cypress.env('baseUrl') + '?audience_override=audience:override');
      cy.getLocalStorage('audience_override')
        .then($audience_override => {
          expect($audience_override).to.equal('audience:override')
        })
  })
});

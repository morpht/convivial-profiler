// Test for Convivial Profiler Topic override profiler

describe('Topic Override Profiler: Test 01', () => {
  it('1. Checks Topic override query parameter and saves to storage.'
      , () => {
      // Open the topic override page.
      cy.visit(Cypress.env('baseUrl') + '?topic_override=topic-override');
      cy.getLocalStorage('topic_override')
        .then($topic_override => {
          expect($topic_override).to.equal('topic-override')
        })
  })
});

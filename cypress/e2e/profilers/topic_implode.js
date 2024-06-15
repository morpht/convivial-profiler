// Test for Convivial Profiler Topic Implode profiler

describe('Topic Implode Profiler: Test 01', () => {
  it('1. Checks Topic implode.'
      , () => {
      // Open the home page.
      cy.visit(Cypress.env('baseUrl'));
      window.localStorage.setItem('topic_tops_raw', '["topic:sci-fi","topic:comedic-fiction"]');
      cy.getLocalStorage('topic_tops')
        .then($topic_tops => {
          expect($topic_tops).to.equal('topic:sci-fi+topic:comedic-fiction')
        })
  })
});

// Test for Convivial Profiler Topic recent profiler

describe('Topic recent Profiler: Test 01', () => {
    it('1. Set the topic_key metatag to storage.'
        , () => {
        // Open the topic profiler page.
        cy.visit(Cypress.env('baseUrl') + 'topic_recent.html');
        cy.getLocalStorage('topic_recent')
          .then($topic => {
            expect($topic).to.equal('topic:test')
          })
    })
});

// Test for Convivial Profiler Topic decision tree profiler

describe('Topic decision tree Profiler: Test 01', () => {
    it('1. Set the topic decision tree cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('topic_decision_tree')
          .then($topic_decision_tree => {
            expect($topic_decision_tree).to.equal(null)
          })
        // Set the topic decision tree cookie.
        cy.setCookie('decision_tree_outcome_84', 'topic:decision_tree', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('topic_decision_tree')
          .then($topic_decision_tree => {
            expect($topic_decision_tree).to.equal('topic:decision_tree')
          })
    })
});

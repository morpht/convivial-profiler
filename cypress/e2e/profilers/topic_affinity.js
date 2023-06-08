// Test for Convivial Profiler Topic Affinity profiler

describe('Topic Affinity Profiler: Test 01', () => {
    it('1. Picks the best topic out from topic, topic crm, and topic decision tree.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('topic_affinity')
          .then($topic => {
            expect($topic).to.equal('topic:general')
          })
        // Open the topic profiler page.
        cy.visit(Cypress.env('baseUrl') + 'topic.html');
        cy.getLocalStorage('topic_affinity')
          .then($topic => {
            expect($topic).to.equal('topic:test')
          })
        // Set the topic decison tree cookie.
        cy.setCookie('decision_tree_outcome_84', 'topic:decision_tree', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('topic_affinity')
          .then($topic => {
            expect($topic).to.equal('topic:decision_tree')
          })
          // Set the topic CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_topic', 'topic:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('topic_affinity')
          .then($topic => {
            expect($topic).to.equal('topic:enricher')
          })
    })
});

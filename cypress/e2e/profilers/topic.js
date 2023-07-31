// Test for Convivial Profiler Topic bestpick profiler

describe('Topic bestpick Profiler: Test 01', () => {
    it('1. Picks the best topic out from topic, topic crm, and topic decision tree.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('topic')
          .then($topic => {
            expect($topic).to.equal('topic:general')
          })
        // Open the topic profiler page.
        cy.visit(Cypress.env('baseUrl') + 'topic_meta.html');
        cy.getLocalStorage('topic')
          .then($topic => {
            expect($topic).to.equal('topic:test')
          })
          // Set the topic CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_topic', 'topic:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('topic')
          .then($topic => {
            expect($topic).to.equal('topic:enricher')
          })
        // open the topic parameter page of application.
        cy.visit(Cypress.env('baseUrl') + '?topic=topic:topic_param');
        cy.getLocalStorage('topic')
          .then($topic => {
            expect($topic).to.equal('topic:topic_param')
          })
        // Open the topic override page.
        cy.visit(Cypress.env('baseUrl') + '?topic_override=topic:override');
        cy.getLocalStorage('topic')
        .then($topic => {
          expect($topic).to.equal('topic:override')
        })
    })
});

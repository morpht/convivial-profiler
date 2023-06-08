// Test for Convivial Profiler Topic CRM profiler

describe('Topic CRM Profiler: Test 01', () => {
    it('1. Set the topic crm cookie to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('topic_crm')
          .then($topic_crm => {
            expect($topic_crm).to.equal(null)
          })
        // Set the topic CRM cookie.
        cy.setCookie('convivial_enricher_convivial_demo_topic', 'topic:enricher', {
          path: '/'
        });
        // Reload the application.
        cy.reload(true);
        cy.getLocalStorage('topic_crm')
          .then($topic_crm => {
            expect($topic_crm).to.equal('topic:enricher')
          })
    })
});

// Test for Convivial Profiler Goal profiler

describe('Goal Profiler: Test 01', () => {
    it('1. Set the goal metatag to storage dimensions.'
        , () => {
        // Open the goal profiler page.
        cy.visit(Cypress.env('baseUrl') + 'goal.html');
        cy.getLocalStorage('subscribe:on')
          .then($goal => {
            expect($goal).to.equal('subscribe:on')
          })
    })
});

// Test for Convivial Profiler Audience recent profiler

describe('Audience recent Profiler: Test 01', () => {
    it('1. Set the audience_key metatag to storage.'
        , () => {
        // Open the audience profiler page.
        cy.visit(Cypress.env('baseUrl') + 'audience_recent.html');
        cy.getLocalStorage('audience_recent')
          .then($audience => {
            expect($audience).to.equal('audience-test')
          })
    })
});

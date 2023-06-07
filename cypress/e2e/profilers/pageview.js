// Test for Convivial Profiler Page view profiler

describe('Page view Profiler: Test 01', () => {
    it('1. Save the page views on application to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('visits')
          .then($visits => {
            expect($visits).to.equal('1')
          })
        cy.getLocalStorage('experience')
          .then($experience => {
            expect($experience).to.equal('experience:none')
          })
        // Reload the application once.
        cy.reload(true);
        cy.getLocalStorage('visits')
          .then($visits => {
            expect($visits).to.equal('2')
          })
        cy.getLocalStorage('experience')
          .then($experience => {
            expect($experience).to.equal('experience:low')
          })
        // Reload the application.
        cy.reload(true);
        cy.reload(true);
        cy.reload(true);
        cy.reload(true);
        cy.reload(true);
        cy.reload(true);
        cy.reload(true);
        cy.reload(true);
        cy.getLocalStorage('visits')
          .then($visits => {
            expect($visits).to.equal('10')
          })
        cy.getLocalStorage('experience')
          .then($experience => {
            expect($experience).to.equal('experience:medium')
          })
        // Reload the application.
        for (var i = 11; i <= 100; i++) {
          cy.reload(true);
        }
        cy.getLocalStorage('visits')
          .then($visits => {
            expect($visits).to.equal('100')
          })
        cy.getLocalStorage('experience')
          .then($experience => {
            expect($experience).to.equal('experience:high')
          })
    })
});

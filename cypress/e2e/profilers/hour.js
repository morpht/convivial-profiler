// Test for Convivial Profiler hour profiler

describe('Hour Profiler: Test 01', () => {
    it('1. Saves the current hour to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('hour')
          .then($hour => {
            expect($hour).to.be.a('string');
            expect($hour).to.not.be.empty;
            expect($hour).to.equal(new Date().getHours().toString());
          })
          cy.getLocalStorage('daytime')
          .then($daytime => {
            expect($daytime).to.be.a('string');
            expect($daytime).to.not.be.empty;
          })
    })
});

// Test for Convivial Profiler language profiler

describe('Language Profiler: Test 01', () => {
    it('1. Saves the user browser language to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('language')
          .then($language => {
            expect($language).to.be.a('string');
            expect($language).to.not.be.empty;
            expect($language).to.equal(navigator.language.toLowerCase());
          })
    })
});

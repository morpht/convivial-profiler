// Test for Convivial Profiler office hours profiler

describe('Office hours Profiler: Test 01', () => {
    it('1. Saves the office hours to storage based on current time.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('office_open')
          .then($office_hours => {
            expect($office_hours).to.be.a('string');
            expect($office_hours).to.not.be.empty;
          })
    })
});

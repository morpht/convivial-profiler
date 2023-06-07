// Test for Convivial Profiler Device type profiler

describe('Device type Profiler: Test 01', () => {
    it('1. Saves the current device type to storage.'
        , () => {
        // open the application.
        cy.visit(Cypress.env('baseUrl'));
        cy.getLocalStorage('device_type')
          .then($device_type => {
            expect($device_type).to.be.a('string');
            expect($device_type).to.not.be.empty;
            expect($device_type).to.equal('desktop');
          })
    })
});

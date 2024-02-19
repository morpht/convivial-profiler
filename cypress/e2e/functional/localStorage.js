// Test for Convivial Profiler with no local storage.

describe('No Local Storage: Test 01', () => {
  it('1. Check no error is thrown if the localstorage is disabled.'
      , () => {
      cy.disableLocalStorage();
        // Open the default page.
      cy.visit(Cypress.env('baseUrl'));
      cy.window()
        .its('console')
        .then((console) => {
          cy.stub(console, 'error').throws('Console error')
        })
  })
});

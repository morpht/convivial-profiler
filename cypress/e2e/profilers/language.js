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

describe('Language Profiler: browser language variants', () => {
  const cases = [
    { language: 'en', expected: 'en' },
    { language: 'ja', expected: 'ja' },
    { language: 'en-AU', expected: 'en-AU' },
    { language: 'pt-BR', expected: 'pt-BR' },
    { language: 'zh-Hant', expected: 'zh-Hant' },
    { language: 'zh-Hant-TW', expected: 'zh-Hant-TW' },
    { language: null, expected: 'en' },
    { language: undefined, expected: 'en' },
    { language: '', expected: 'en' },
  ];

  cases.forEach(({ language, expected }) => {
    it(`Collects ${String(language)} as ${expected}`, () => {
      cy.visit(Cypress.env('baseUrl'), {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', {
            configurable: true,
            value: language,
          });
        },
      });

      cy.window().then(win => {
        const values = [];
        win.convivialProfiler.profilerSource.acceptlang({}, {}, values);
        expect(values).to.deep.equal([expected]);
      });
      cy.getLocalStorage('language')
        .should('equal', expected.toLowerCase());
    });
  });
});

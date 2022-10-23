// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset');

  const user = { username: 'testUser01', name: 'User 001', password: '123456' };

  cy.request('POST', 'http://localhost:3001/api/users', user);
});

Cypress.Commands.add('setUserInLocalStorage', (user) => {
  localStorage.setItem('user', JSON.stringify(user));
  cy.visit('http://localhost:3000');
});
describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB();
  });

  it('Login form is shown', function () {
    cy.get('#username');
    cy.get('#password');
  });

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.get('#username').type('testUser01');
      cy.get('#password').type('123456');

      cy.get('#login-button').click();

      cy.contains('User 001 is logged in');
      cy.get('#logout-button');
    });

    it('Fails when using incorrect credentials', function () {
      cy.get('#username').type('testUser01');
      cy.get('#password').type('12345612312312');

      cy.get('#login-button').click();

      cy.get('#login-button');
      cy.get('#notification-wrapper').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });
});

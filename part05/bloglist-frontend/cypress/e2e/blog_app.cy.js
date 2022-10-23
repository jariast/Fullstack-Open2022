import { users, blogs } from '../helpers/testHelpers';

describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB();
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.get('#username');
    cy.get('#password');
  });

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000');

      cy.get('#username').type('testUser01');
      cy.get('#password').type('123456');

      cy.get('#login-button').click();

      cy.contains('User 001 is logged in');
      cy.get('#logout-button');
    });

    it('Fails when using incorrect credentials', function () {
      cy.visit('http://localhost:3000');

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

  describe('When user is logged in', function () {
    //this approach didnt work because the bofore it's getting called all the beforeeach

    // before(function () {
    //   console.log('Login user using API', '');
    //   cy.request('POST', 'http://localhost:3001/api/login', {
    //     username: 'testUser01',
    //     password: '123456',
    //   }).then(({ body }) => {
    //     user = body;
    //   });
    // });

    beforeEach(function () {
      //This can be refactored into a new command
      const user = { ...users[0] };
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: user.username,
        password: user.password,
      }).then(({ body }) => {
        cy.setUserInLocalStorage(body);
      });
    });

    it('The user can add a blog', function () {
      cy.contains('New Blog').click();

      cy.get('#title').type(blogs[0].title);
      cy.get('#author').type(blogs[0].author);
      cy.get('#url').type(blogs[0].url);

      cy.get('#create-blog-button').click();
      cy.get('[data-testid="blogWrapper"]').should('have.length', 1);
      cy.contains(`${blogs[0].title} ${blogs[0].author}`);
    });

    describe('And there is one created blog', function () {
      beforeEach(function () {
        cy.createBlogUsingAPI(blogs[0]);
      });

      it.only('User can like a blog', function () {
        // toggle-details-button
        cy.get('#toggle-details-button').click();
        // cy.get('[data-testid="blogWrapper"]')[0].contains('Likes:');
        cy.get('#blog-likes').contains('0');
        cy.get('#like-blog-button').click();
        cy.get('#blog-likes').contains('1');
      });
    });
  });
});

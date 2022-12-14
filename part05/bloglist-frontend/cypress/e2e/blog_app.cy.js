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
      const user = { ...users[0] };

      cy.loginAsUser(user);
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

      it('User can like a blog', function () {
        cy.get('#toggle-details-button').click();

        cy.get('#blog-likes').contains('0');
        cy.get('#like-blog-button').click();
        cy.get('#blog-likes').contains('1');
      });

      it('User can delete a blog they created', function () {
        cy.get('#toggle-details-button').click();

        cy.get('#delete-blog-button').click();

        cy.get('[data-testid="blogWrapper"]').should('not.exist');
      });

      it('If user is not the creator of a blog, the delete button should not appear', function () {
        const user = { ...users[1] };

        cy.request('POST', 'http://localhost:3001/api/users', user);

        cy.loginAsUser(user);

        cy.contains('User 002 is logged in');

        cy.get('#toggle-details-button').click();

        cy.get('#delete-blog-button').should('not.exist');
      });
    });

    describe('And there are several blogs', function () {
      beforeEach(function () {
        blogs.map((blog) => {
          cy.createBlogUsingAPI(blog);
        });
      });

      it.only('Should reorder list according to number of likes', function () {
        cy.get('[data-testid="blogWrapper"]').should('have.length', 3);

        cy.get('[data-testid="blogWrapper"]')
          .contains(blogs[1].title)
          .as('mostLikedblog');
        cy.get('@mostLikedblog').find('#toggle-details-button').click();

        cy.likeBlogAndWaitByAlias('@mostLikedblog', 1);
        cy.likeBlogAndWaitByAlias('@mostLikedblog', 2);
        cy.likeBlogAndWaitByAlias('@mostLikedblog', 3);

        cy.get('[data-testid="blogWrapper"]')
          .contains(blogs[2].title)
          .as('2ndMostLikedBlog');
        cy.get('@2ndMostLikedBlog').find('#toggle-details-button').click();

        cy.likeBlogAndWaitByAlias('@2ndMostLikedBlog', 1);
        cy.likeBlogAndWaitByAlias('@2ndMostLikedBlog', 2);

        cy.get('[data-testid="blogWrapper"]')
          .eq(0)
          .should('contain', blogs[1].title);
        cy.get('[data-testid="blogWrapper"]')
          .eq(1)
          .should('contain', blogs[2].title);
        cy.get('[data-testid="blogWrapper"]')
          .eq(2)
          .should('contain', blogs[0].title);
      });
    });
  });
});

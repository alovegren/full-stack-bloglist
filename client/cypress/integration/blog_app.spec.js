describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Nubster Tester',
      username: 'nub',
      password: 'password',
    };

    cy.request('POST', '/api/users', user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.get('#login-form');
  });

  describe('Login', function() {
    it ('succeeds with correct credentials', function() {
      cy.get('#username-input').type('nub');
      cy.get('#password-input').type('password');
      cy.get('#login-form-btn').click();
      cy.contains('Nubster Tester is logged in.');
    });

    it('fails with incorrect credentials', function() {
      cy.get('#username-input').type('nub');
      cy.get('#password-input').type('bad password');
      cy.get('#login-form-btn').click();
      cy.contains('Username or password is incorrect');
    });
  });

  describe('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'nub', password: 'password' });
    });

    it('A blog can be created', function() {
      cy.contains('show new blog form').click();
      cy.contains('title').find('input').type('new blog a la cypress');
      cy.contains('author').find('input').type('test author');
      cy.contains('url').find('input').type('test url');
      cy.contains('new blog').click();
      cy.contains('new blog a la cypress by test author');
    });

    describe('When there exist many blog entries', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'blog 1', author: 'author 1', url: 'url 1' });
        cy.createBlog({ title: 'blog 2', author: 'author 2', url: 'url 2' });
        cy.createBlog({ title: 'blog 3', author: 'author 3', url: 'url 3' });
      });

      it('one of them can be liked', function() {
        cy.contains('blog 2').parent().as('blogArticle');
        cy.get('@blogArticle').find('.blogDetailButton').click();
        cy.get('@blogArticle').find('.likeButton').click();
        cy.contains('likes: 1');
      });

      it('one of them can be deleted by the user who created it', function() {
        cy.contains('blog 2').parent().as('blogArticle');
        cy.get('@blogArticle').find('.blogDetailButton').click();
        cy.get('@blogArticle')
          .find('.deleteBlogButton')
          .click()
          .should('not.contain', 'blog 2');
      });

      describe('with distinct values for likes', function () {
        beforeEach(function() {
          cy.likeBlog('blog 1');
          cy.likeBlog('blog 2').likeBlog('blog 2');
          cy.likeBlog('blog 3').likeBlog('blog 3').likeBlog('blog 3');
        });

        it('they are ordered by number of likes from most to least', function() {
          cy.get('article').then($blogArticles => {
            const titles = Cypress.$.map($blogArticles, (article) => {
              return article.firstElementChild.textContent;
            });

            expect(titles).to.deep.equal(['blog 3', 'blog 2', 'blog 1']);
          });
        });
      });
    });
  });
});
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'fran15',
      name: 'Francisco',
      password: '123456789'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('fran15')
      cy.get('#password').type('123456789')
      cy.get('#login-button').click()

      cy.contains('Francisco logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('fran15')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('fran15')
      cy.get('#password').type('123456789')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A blog created by Fran')
      cy.get('#author').type('Francisco Teste')
      cy.get('#url').type('https://www.fran.io/')
      cy.get('#create-blog-button').click()

      cy.contains('A blog created by Fran was added')
    })

    describe('When logged in and a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('A blog created by Fran')
        cy.get('#author').type('Francisco Teste')
        cy.get('#url').type('https://www.fran.io/')
        cy.get('#create-blog-button').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('Likes: 1')
      })
    })
  })
})
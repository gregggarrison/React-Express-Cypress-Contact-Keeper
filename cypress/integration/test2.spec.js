///<reference types="cypress" />

describe('registering a new user', () => {

    beforeEach('visit home page', () => {
        cy.visit('/')
        cy.contains('a', 'Register').click()
    })

    it('goes to home page and click\'s register and signs up', () => {
        cy.get('form div input[name="name"]').type('Mary Larry')
        cy.get('form div input[name="email"]').type('mlary@mail.com')
        cy.get('form div input[name="password"]').type('password')
        cy.get('form div input[name="password2"]').type('password')
        cy.get('input[value="Register"]').click()
    })

    it('an existing user trys to register then goes to login page and logs in', () => {
        cy.get('form div input[name="name"]').type('Mary Larry')
        cy.get('form div input[name="email"]').type('mlary@mail.com')
        cy.get('form div input[name="password"]').type('password')
        cy.get('form div input[name="password2"]').type('password')
        cy.get('input[value="Register"]').click()

        cy.get('.alert').should('contain', 'User already exists')
    })
    
})
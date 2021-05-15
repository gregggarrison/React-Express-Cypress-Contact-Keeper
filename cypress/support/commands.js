import { onLoginPage } from '../support/pageObjects/loginPage'


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
Cypress.Commands.add('openHomePageAndLogin', () => {

    const userCredentials = {
        "email": "g.garrison@me.com",
        "password": "password"
    }

    cy.request('POST', 'http://localhost:3000/api/auth', userCredentials)
        .its('body').then(body => {
            const token = body.token
            cy.wrap(token).as('token')
            cy.visit('/', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', token)
                }
            })
        })
})

Cypress.Commands.add('logout', () => {
    onLoginPage.logout()
})

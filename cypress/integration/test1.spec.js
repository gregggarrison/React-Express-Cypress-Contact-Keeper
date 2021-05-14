///<reference types="cypress" />

import { onHomePage } from '../support/pageObjects/homePage';
import { onLoginPage } from '../support/pageObjects/loginPage'

describe('Our first suite', () => {
    beforeEach('open application and login with email and password', () => {
        cy.openHomePage();
        onLoginPage.submitLoginFormValidCredentials('g.garrison@me.com', 'password')
        cy.wait(2000)
    })

    it('once user logged in add a new contact and submit', () => {
        onHomePage.addNewContact('Tim Taylor', 'ttaylor@mail.com', '123-456-7890')
        onHomePage.addNewContact('Steve Smith', 'ssmith@mail.com', '433-456-7890')
        onHomePage.addNewContact('John Doe', 'jdoe@mail.com', '123-456-7890')
        onHomePage.addNewContact('Mary Bridget', 'mbridget@mail.com', '123-456-7890')
        onLoginPage.logout();
    })

    it('update contact name by name', () => {
        onHomePage.updateContactName('Tim Taylor', 'Timm Taylor')
        onLoginPage.logout()
    })

    it('delete a contact by contact name', () => {
        onHomePage.deleteContact('Timm Taylor')
        onHomePage.deleteContact('Steve Smith')
        onHomePage.deleteContact('John Doe')
        onHomePage.deleteContact('Mary Bridget')
    })
})
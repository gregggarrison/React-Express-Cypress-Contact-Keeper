///<reference types="cypress" />

import { onHomePage } from '../support/pageObjects/homePage';

describe('Our first suite', () => {
    beforeEach('open application and login with email and password', () => {
        cy.openHomePageAndLogin();

    })
    afterEach('user logs out after each test', () => {
        cy.logout();
    })

    it('once user logged in add a new contact and submit', () => {
        onHomePage.addNewContact('Tim Taylor', 'ttaylor@mail.com', '123-456-7890')
        onHomePage.addNewContact('Steve Smith', 'ssmith@mail.com', '433-456-7890')
        onHomePage.addNewContact('John Doe', 'jdoe@mail.com', '123-456-7890')
        onHomePage.addNewContact('Mary Bridget', 'mbridget@mail.com', '123-456-7890')
    })

    it('update contact name by name', () => {
        onHomePage.updateContactName('Tim Taylor', 'Timm Taylor')
    })

    it('delete a contact by contact name', () => {
        onHomePage.deleteContact('Timm Taylor')
        onHomePage.deleteContact('Steve Smith')
        onHomePage.deleteContact('John Doe')
        onHomePage.deleteContact('Mary Bridget')
    })
})
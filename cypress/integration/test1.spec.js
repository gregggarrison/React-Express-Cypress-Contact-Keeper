///<reference types="cypress" />
import { onHomePage } from '../support/pageObjects/homePage';

describe('generic testing suite', () => {
    beforeEach('open application and login with email and password', () => {
        cy.openHomePageAndLogin();
    })

    it('once user logged in add a new contacts -> submit -> filter', () => {
        onHomePage.addNewContact('Tim Taylor', 'ttaylor@mail.com', '123-456-7890', 'professional')
        onHomePage.addNewContact('Steve Smith', 'ssmith@mail.com', '433-456-7890', 'personal')
        onHomePage.addNewContact('John Doe', 'jdoe@mail.com', '123-456-7890', 'professional')
        onHomePage.addNewContact('Mary Bridget', 'mbridget@mail.com', '123-456-7890', 'personal')
        onHomePage.filterContacts('doe')
        cy.logout()
    })

    it('update contact name by name', () => {
        onHomePage.updateContactName('Tim Taylor', 'Timm Taylor')
        cy.logout()
    })

    it('delete a contact by contact name', () => {
        onHomePage.deleteContact('Timm Taylor')
        onHomePage.deleteContact('Steve Smith')
        onHomePage.deleteContact('John Doe')
        onHomePage.deleteContact('Mary Bridget')
    })

})

export class HomePage {

    addNewContact(name, email, phone) {
        cy.get('form').first().then(newContactForm => {
            cy.intercept('POST', '**/contacts').as('postContacts');

            cy.wrap(newContactForm).find('input[placeholder="Name"]').type(name)
            cy.wrap(newContactForm).find('input[placeholder="Email"]').type(email)
            cy.wrap(newContactForm).find('input[placeholder="Phone"]').type(phone)
            cy.wrap(newContactForm).find('.btn').click()
            cy.wait(100)
            
            cy.wait('@postContacts')
            cy.get('@postContacts').then(xhr => {
                console.log(xhr)
                expect(xhr.response.statusCode).to.equal(200)
                expect(xhr.request.body.name).to.equal(name)
                expect(xhr.request.body.email).to.equal(email)
                expect(xhr.request.body.phone).to.equal(phone)
            })
        })
        cy.get('.card').contains('h3', name).should('contain', name)
    }

    updateContactName(name, newName) {
        cy.contains('.card', name).then(contact => {
            cy.wrap(contact).find('button').eq(0).click()
        })
        cy.get('form').first().then(updateContactForm => {
            cy.wrap(updateContactForm).find('[name="name"]').clear().type(newName)
            cy.wrap(updateContactForm).find('.btn').first().click()
        })
        cy.get('.card').contains('h3', newName).should('contain', newName);
    }

    deleteContact(name) {
        cy.contains('.card', name).then(contact => {
            cy.wrap(contact).find('button').eq(1).click()
        })
    }

}

export const onHomePage = new HomePage();
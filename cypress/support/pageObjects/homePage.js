
export class HomePage {
    addNewContact(name, email, phone, type) {
        cy.get('form').first().then(newContactForm => {
            cy.intercept('POST', '**/contacts').as('postContacts');
            cy.wrap(newContactForm).find('input[placeholder="Name"]').type(name)
            cy.wrap(newContactForm).find('input[placeholder="Email"]').type(email)
            cy.wrap(newContactForm).find('input[placeholder="Phone"]').type(phone)
            if (type === 'professional') {
                cy.wrap(newContactForm).find('input[value="professional"]').click()
            }
            cy.wrap(newContactForm).find('.btn').click()
            //********* ASK SOMEONE ABOUT THIS???  it doesn't work without cy.wait...supposed to wait for '@postContacts' */
            cy.wait(50)
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

    filterContacts(text) {
        cy.get('form').eq(1).type(text)
        cy.wait(2000)
        cy.get('.card').find('h3').should('contain', 'John Doe')
    }

    updateContactName(name, newName) {
        cy.intercept('PUT', '**/contacts/**').as('putContact');
        cy.contains('.card', name).then(contact => {
            console.log(cy.wrap(contact))
            cy.wrap(contact).find('button').eq(0).click()
        })
        cy.get('form').first().then(updateContactForm => {
            cy.wrap(updateContactForm).find('[name="name"]').clear().type(newName)
            cy.wrap(updateContactForm).find('.btn').first().click()
        })
        cy.wait('@putContact')
        cy.get('@putContact').then(xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.name).to.equal('Timm Taylor')
            const id = xhr.request.body._id;
            expect(xhr.request.url).to.contain(id)
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
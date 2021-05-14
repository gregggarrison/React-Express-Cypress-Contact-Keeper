
export class LoginPage {
    submitLoginFormValidCredentials(email, password) {
        cy.get('.form-group').find('[name="email"]').type(email);
        cy.get('.form-group').find('[type="password"]').type(password);
        cy.get('input[type="submit"]').type('{enter}')
        cy.get('[id="cy-logout"]').then(logout => {
            expect(logout.text()).to.equal('Logout')
        })
    }
    logout(){
        cy.get('[id="cy-logout"]').click()
    }
}

export const onLoginPage = new LoginPage();


/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade: "Detalhes da Conta" e seu fluxo', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        
    });
    it('Deve preencher com dados válidos e salvar', () => {        
        cy.validLogin()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click();
        cy.url().should('eq','http://lojaebac.ebaconline.art.br/minha-conta/edit-account/');

        
        cy.fixture('user').then(user => {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();   
            
            cy.get('#account_first_name').type(firstName);
            cy.get('#account_last_name').type(lastName);
            cy.get('#account_display_name')
              .clear()
              .type(user.userName);
            cy.get('#account_email').should('have.value', user.email);
            cy.get('.woocommerce-Button').click();
            
            cy.get('.woocommerce-message').should('contain.text', 'Detalhes da conta modificados com sucesso.');

        });   
    });
    it('Deve mudar a senha com sucesso', () => {
        cy.validLogin()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click();
        cy.url().should('eq','http://lojaebac.ebaconline.art.br/minha-conta/edit-account/');

        cy.fixture('user').then(user => { 
            const newPassword = faker.internet.password();

            cy.get('#password_current').type(user.password);
            cy.get('#password_1').type(newPassword);
            cy.get('#password_2').type(newPassword);
            cy.get('.woocommerce-Button').click();

            const updatedUser = { ...user, password: newPassword };
            cy.writeFile('cypress/fixtures/user.json', updatedUser);
            cy.get('.woocommerce-message').should('contain.text', 'Detalhes da conta modificados com sucesso.');
            
        });
        
    });

});
/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade de Cadastro de Usuário', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
    });

    it('Cadastrar com dados validos com Sucesso', () => {
        const email = faker.internet.email().toLowerCase();
        const password = faker.internet.password();

        cy.registerUser(email, password)
    });
    it('Não cadastrar com email repetido', () => {
        
        cy.fixture('user').then(user => {
            cy.get('#reg_email').type(user.email);
            cy.get('#reg_password').type(user.password);
            cy.get("input[value='Register']").click();
        });
        cy.get('.woocommerce-error')
          .should('contain.text', 'Uma conta já está registrada com seu endereço de e-mail.');
    });
});
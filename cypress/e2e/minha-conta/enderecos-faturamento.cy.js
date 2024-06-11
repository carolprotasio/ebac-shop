/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade: "Endereço de Faturamento" e seu fluxo', () => {
    let userData;
    before(() => {
        cy.generateUserData().then((data) => {
            userData = data;
        })
    });
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        cy.validLogin()  

        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click();
        cy.url().should('eq','http://lojaebac.ebaconline.art.br/minha-conta/edit-address/');
        
    });
it('Deve alterar/cadastrar o Endereço de Faturamento com sucesso', () => { 

      cy.get(':nth-child(1) > .title > .edit').click();
      cy.url().should('eq','http://lojaebac.ebaconline.art.br/minha-conta/edit-address/faturamento/');

      cy.fillBillingDetails(userData);
        cy.get('.button').click();

        cy.get('.woocommerce-message').should('contain.text', 'Endereço alterado com sucesso.')
        
    });
it('Deve alterar/cadastrar o Endereço de Entrega com sucesso', () => { 

      cy.get(' div.col2-set.row.addresses > div:nth-child(2) > header > a ').click();
      cy.url().should('eq','http://lojaebac.ebaconline.art.br/minha-conta/edit-address/entrega/');

        cy.get('#shipping_first_name').clear().type(userData.firstName);
        cy.get('#shipping_last_name').clear().type(userData.lastName);
        cy.get('#shipping_company').clear().type(userData.company);

        cy.get('#select2-shipping_country-container').click();
        cy.get('#shipping_country_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').type(`${userData.country}{enter}`);

        cy.get('#shipping_address_1').clear({ force: true }).type(userData.address);
        cy.get('#shipping_city').clear({ force: true }).type(userData.city);

        cy.get('#select2-shipping_state-container').click();
        cy.get('.select2-dropdown').contains(userData.state).click();

        cy.get('#shipping_postcode').clear({ force: true }).type(userData.zipCode);       

        cy.get('.button').click();

        cy.get('.woocommerce-message').should('contain.text', 'Endereço alterado com sucesso.')
        
    });
});
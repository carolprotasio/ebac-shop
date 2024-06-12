/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade E2E: Realizar checkout das compras', () => {

    let userData;
    let user;
    before(() => {
        cy.generateUserData().then((data) => {
            userData = data;
        })
        cy.fixture('user').then((data) => {
            user = data;
        })
    });

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        cy.validLogin()
        
    });
    it('Deve realizar o checkout: Método de Pagamento => Transferência Bancária ', () => {  
        
        const comments = faker.random.words(8)
        cy.visit('/produtos/'); 
        cy.addProductToCart(7, 'M', 'Green'); 

        cy.get('@productName').then((productName) => {
            cy.visit('/checkout/'); 

            cy.fillBillingDetails(userData);
            cy.get('#billing_email').should('have.value', user.email);  
            cy.get('#order_comments').type(comments)

            cy.get('#payment_method_bacs').click();
            cy.get('#terms').click();
            cy.get('#place_order').click();
            

            cy.get('#main > header > h1').should('contain.text', "Pedido recebido" )

            cy.get('tbody > :nth-child(1) > .product-name').should('contain.text', productName);
        });
    });
    it('Deve realizar o checkout: Método de Pagamento => Check ', () => {  
        
        const comments = faker.random.words(8)
        cy.visit('/produtos/'); 
        cy.addProductToCart(7, 'M', 'Green'); 

        cy.get('@productName').then((productName) => {
            cy.visit('/checkout/'); 

            cy.fillBillingDetails(userData);
            cy.get('#billing_email').should('have.value', user.email);  
            cy.get('#order_comments').type(comments)

            cy.get('#payment_method_cheque').click();
            cy.get('#terms').click();
            cy.get('#place_order').click();
            

            cy.get('#main > header > h1').should('contain.text', "Pedido recebido" )

            cy.get('tbody > :nth-child(1) > .product-name').should('contain.text', productName);
        });
    });
    it('Deve realizar o checkout: Método de Pagamento => Pag na Entrega ', () => {  
        
        const comments = faker.random.words(8)
        cy.visit('/produtos/'); 
        cy.addProductToCart(7, 'M', 'Green'); 

        cy.get('@productName').then((productName) => {
            cy.visit('/checkout/'); 

            cy.fillBillingDetails(userData);
            cy.get('#billing_email').should('have.value', user.email);  
            cy.get('#order_comments').type(comments)

            cy.get('#payment_method_cod').click();
            cy.get('#terms').click();
            cy.get('#place_order').click();
            

            cy.get('#main > header > h1').should('contain.text', "Pedido recebido" )

            cy.get('tbody > :nth-child(1) > .product-name').should('contain.text', productName);
        });
    });
});
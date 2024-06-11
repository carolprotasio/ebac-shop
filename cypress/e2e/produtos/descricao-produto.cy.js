/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade: Avaliação do Produto', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        cy.validLogin()
        cy.visit('/produtos/');
        
    });
    it('Deve Avaliar o produto com Sucesso', () => { 

        cy.get('[class="product-block grid"]')
        .eq(1)
        .click();
        
        const comment = faker.random.words(8);
        
        cy.get('#tab-title-reviews > a').click();
        cy.get('#commentform > p.comment-form-rating > p > span > a.star-4').click();       
        
        cy.get('#comment').type(comment);
        cy.get('#submit').click();

        cy.get('.description > p').should('contain.text', comment)
    });
});
/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade: Testar a Barra de Navegação', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        
        cy.visit('/');
    });

    it('Usuário logado Deve buscar um item especifico na busca', () => { 
        cy.visit('/my-account/');
        cy.validLogin();
        const result = 'Pullover'.toUpperCase();
        
        cy.get('#tbay-header .header-main .search .tbay-search.form-control.input-sm')
        .should('be.visible')
        .clear({ force: true })   
        .type(result, { force: true })
        .type('{enter}');
        cy.wait(200)

        cy.get('.page-title')
        .invoke('text')
        .should((text) => {
         expect('eq', `RESULTADO DA PESQUISA POR: "${result}"`)
        })
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.log('Caught exception:', err);
           
            return false;
        });
        
    });


    it('Deve selecionar home-3 da barra de navegação ', () => {
        cy.visit('/');
        cy.get('#primary-menu > .menu-item-536 > .dropdown-toggle')
        .trigger('mouseover');

        cy.get("ul[class='dropdown-menu sub-menu'] li[class='menu-item-857 aligned-'] a")
        .should('exist')
        .then(($element) => {
            if($element.length > 0) {
                cy.wrap($element).click({ force: true });
                cy.url().should('include', '/home-3');
            }else {
                cy.log("element doesn't exist")
            }    
        })
        
        
    });
});

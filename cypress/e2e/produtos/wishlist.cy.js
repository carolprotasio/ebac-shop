/// <reference types="cypress" />


describe('Funcionalidade: Wishlist', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        cy.validLogin()
        
    });
    it('Deve salvar um produto no Wishlist com sucesso', () => { 
                      
        cy.addToWishlist(3);        
        
        cy.get('@productName').then((productName) => {
            cy.visit('/lista-de-desejos/');
            cy.get('.wishlist_table').should('contain', productName);
        });
        
    });
 
    it('Deve adicionar 5 ítens no Wishlist com sucesso', () => {           
        cy.cleanWishlist();  
             
        cy.addToWishlist(2);        
        cy.addToWishlist(4);        
        cy.addToWishlist(6);        
        cy.addToWishlist(7);        
        cy.addToWishlist(8);   
        
        const productNames = [];

        cy.get('@productName').then((productName) => {
            productNames.push(productName);
        });
        
        cy.visit('/lista-de-desejos/');
        
        cy.wrap(productNames).each((productName) => {
            cy.get('.wishlist_table').should('contain', productName);
        });
             
    });
    it('Deve apagar toda lista do Wishlist com sucesso', () => {         
        cy.cleanWishlist();
        
    });
});
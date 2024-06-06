/// <reference types="cypress" />

describe('Funcionalidade: Adicionar Produtos no Carrinho', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        cy.validLogin()
        cy.visit('/produtos/');
        
    });
    it('Adicionar 1 produto ao carrinho com sucesso', () => { 
        cy.deleteCart()
        cy.addProductToCart(7, 'M', 'Green');

        cy.visit('/carrinho');

        cy.get('.cart_item').should('have.length', 1);
        
    });
    it('Adicionar vários produtos ao carrinho com sucesso', () => {  
        cy.deleteCart()
              
        cy.addProductToCart(7, 'M', 'Green');
        cy.addProductToCart(5, '36', 'Black');
        cy.addProductToCart(3, 'M', 'Red');

        cy.visit('/carrinho');

        cy.get('.cart_item').should('have.length', 3);
        
    });
    it('Adicionar 3 itens do mesmo produto ao carrinho', () => {  
        cy.deleteCart()
              
        cy.addThreeItems(7, 'M', 'Green');
       
        cy.get('.cart_item').should('have.length', 1);
        cy.get('.quantity > .input-text').should('have.value', '3')        
        
    });
 
    it('Adicionar 3 itens ao carrinho e o valor total dever ser igual a soma total dos 3 itens', () => {  
        cy.deleteCart()
              
        cy.addProductToCart(7, 'M', 'Green');
        cy.addProductToCart(5, '36', 'Black');
        cy.addProductToCart(3, 'M', 'Red');

        cy.visit('/carrinho');    
        
        let totalItemsPrice = 0;

        cy.get('.cart-subtotal > td > .woocommerce-Price-amount > bdi')
        .invoke('text')
        .then((totalPriceText) => {            
            const totalPrice = parseFloat(totalPriceText.replace('R$', ''));            
         
            cy.get('.cart_item').each(($item) => {
                const itemPrice = parseFloat($item.find('.product-price .woocommerce-Price-amount').text().replace('R$', ''));
                totalItemsPrice += itemPrice;
            }).then(() => {                
                expect(totalPrice).to.equal(totalItemsPrice);
            });
        });
        
    });

    it.only('Quantidade de itens no cart deve ser igual a quantidade na barra de navegação', () => {  
        cy.deleteCart()
              
        cy.addProductToCart(7, 'M', 'Green');

        cy.visit('/carrinho/');
       
        cy.get('.cart_item').should('have.length', 1);
        cy.get('.quantity > .input-text').should('have.value', '1')   
        
        cy.get('#cart > a > span.mini-cart-items')
          .invoke('text')
          .then((text) => {
            const itemCount = text.trim();
            expect(itemCount).to.eq('1');
          })   
        
    });
 
});
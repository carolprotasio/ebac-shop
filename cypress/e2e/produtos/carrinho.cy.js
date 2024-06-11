/// <reference types="cypress" />

describe('Funcionalidade: Carrinho de compra e seu fluxo', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        cy.validLogin()
        cy.visit('/carrinho/');
        
    });
    it('Adicionar 3 itens ao carrinho e o valor total dever ser igual a soma total dos 3 itens', () => {  
        cy.deleteCart()              
        cy.addProductToCart(7, 'M', 'Green');
        cy.addProductToCart(5, '36', 'Black');
        cy.addProductToCart(3, 'M', 'Red'); 
        
        cy.visit('/carrinho/');
        
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

    it('Adicionar cupom invalido deve receber msg de erro', () => {  
        cy.deleteCart()
              
        cy.addProductToCart(7, 'M', 'Green');

        cy.visit('/carrinho/');

        const invalidCoupon = "invalido"
        cy.get('#coupon_code').clear().type(invalidCoupon); 
        cy.get("input[value='Apply Coupon']").click();       
       
        cy.get('#main > div > div.woocommerce-notices-wrapper > ul > li')
          .invoke('text')
          .then((text) => {
            const couponText = text.trim();
            expect(couponText).to.contain(`O cupom "${invalidCoupon}" não existe!` );
          })         
              
        
    });
    it('Adicionar 1 item de um produto adicionado no carrinho', () => { 
        cy.deleteCart()
        cy.addProductToCart(7, 'M', 'Green');

        cy.visit('/carrinho');

        cy.get('input.input-text.qty.text').should('have.value', '1');
        cy.get('input.plus').click();
        cy.get('.cart_item').should('have.length', 1);
        cy.get('.quantity > .input-text').should('have.value', '2')  
        
    });
    it('Deve remover o produto do carrinho depois de adicionado na tela do cart', () => { 
        cy.deleteCart()
        cy.addProductToCart(7, 'M', 'Green');

        cy.visit('/carrinho');

        cy.get('.product-remove > .remove').click();
        cy.get('.cart-empty').should('contain.text', 'Seu carrinho está vazio');
        
    });
    it('Estando o carrinho vazio deve mostar aviso na navegação e tela carrinho', () => { 
        cy.deleteCart()
        cy.visit('/carrinho/');

        cy.get('.cart-empty').should('contain.text', 'Seu carrinho está vazio');
        cy.get('#cart > a > span.mini-cart-items')
        .invoke('text')
        .then((text) => {
          const itemCount = text.trim();
          expect(itemCount).to.eq('0');
        }) 

    });

});
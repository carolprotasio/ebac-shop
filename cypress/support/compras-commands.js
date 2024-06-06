Cypress.Commands.add('addProductToCart', (productIndex, size, color) => {
    cy.get('[class="product-block grid"]')
        .eq(productIndex)
        .click();
    
    cy.get(`.button-variable-item-${size}`).click();
    cy.get(`.button-variable-item-${color}`).click();
    cy.get('.single_add_to_cart_button').click();

    cy.get('.woocommerce-message')
      .should('contain.text', 'foi adicionado no seu carrinho.');
    cy.visit('/produtos/');
});
Cypress.Commands.add('addThreeItems', (productIndex, size, color) => {
    cy.get('[class="product-block grid"]')
        .eq(productIndex)
        .click();
    
    cy.get(`.button-variable-item-${size}`).click();
    cy.get(`.button-variable-item-${color}`).click();
    cy.get('input.plus').click().click();
    cy.get('.single_add_to_cart_button').click();

    cy.get('.woocommerce-message')
      .should('contain.text', 'foram adicionados no seu carrinho.');
      cy.visit('/carrinho');
});


Cypress.Commands.add('deleteCart', () => {
    cy.visit('/carrinho/');

    cy.get('#main > .woocommerce').then($main => {
        if ($main.find('.cart_item').length > 0) {
            cy.get('.product-remove > .remove').each(($button, index, $buttons) => {
                cy.wrap($button).click({ force: true });
                // Se for o último botão de remover, verifique se o carrinho está vazio
                if (index === $buttons.length - 1) {
                    cy.get('.cart-empty').should('be.visible');
                }
            });
        } else {
            cy.get('.cart-empty').should('contain.text', 'Seu carrinho está vazio');
        }
        cy.visit('/produtos/');
    });
});






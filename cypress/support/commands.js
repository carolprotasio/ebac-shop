Cypress.Commands.add('registerUser', (email, password) => { 
    cy.get('#reg_email').type(email);
    cy.get('#reg_password').type(password);
    cy.get("input[value='Register']").click();

    const userName = email.split('@')[0];
    const welcomeName = `Welcome ${userName} !`;
    const expectedUsername = welcomeName.trim().toLowerCase();;

    cy.get('a > .hidden-xs')
      .invoke('text')
      .then(text => {            
        const actualUsername = text.trim().toLowerCase();;
        expect(actualUsername).to.equal(expectedUsername);
      })
        
      cy.writeFile('cypress/fixtures/user.json', { userName, email, password});
});

Cypress.Commands.add('validLogin', () => {
  cy.fixture('user').then(user => {
    cy.get('#username').type(user.email);
    cy.get('#password').type(user.password);
    cy.get('#customer_login > div:nth-child(1) > form > input.button').click();

    const userName = user.email.split('@')[0];
    const welcomeName = `Welcome ${userName} !`;
    const expectedUsername = welcomeName.trim().toLowerCase();;

    cy.get('a > .hidden-xs')
      .invoke('text')
      .then(text => {            
        const actualUsername = text.trim().toLowerCase();;
        expect(actualUsername).to.equal(expectedUsername);
      })
  });
});

Cypress.Commands.add('invalidPassword', (password) => {
  cy.fixture('user').then(user => { 
    cy.get('#username').type(user.email);
    cy.get('#password').type(password);
    cy.get('#customer_login > div:nth-child(1) > form > input.button').click();

    cy.get('.woocommerce-error > li')
      .should('contain.text', `Erro: A senha fornecida para o e-mail ${user.email} está incorreta. `);
  })

});

Cypress.Commands.add('notRegister', (email, password) => {
  
    cy.get('#username').type(email);
    cy.get('#password').type(password);
    cy.get('#customer_login > div:nth-child(1) > form > input.button').click();

  cy.get('.woocommerce-error > li')
    .should('contain.text', `Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.`);

});

Cypress.Commands.add('loginAndLostPassword', (password) => {
    cy.fixture('user').then(user => { 
    cy.get('#username').type(user.email);
    cy.get('#password').type(password);
    cy.get('#customer_login > div:nth-child(1) > form > input.button').click();

    cy.get(' div.woocommerce-notices-wrapper > ul > li > a').click();
    cy.url().should('eq', 'http://lojaebac.ebaconline.art.br/minha-conta/lost-password/')

    cy.get('#user_login').type(user.email);
    cy.get('.woocommerce-Button').click();
    cy.get('.woocommerce-message').should('contain.text', 'O e-mail de redefinição de senha foi enviado.')
  })

});

Cypress.Commands.add('addToWishlist', (productIndex) => {
  cy.visit('/produtos/');
  cy.get(`.product-block`).eq(productIndex).click();
  cy.get('.summary > .yith-wcwl-add-to-wishlist > .yith-wcwl-add-button > .add_to_wishlist').click();  
  cy.wait(200)
  cy.visit('/lista-de-desejos/');

  cy.get('.wishlist_table tbody tr:first-child .product-name').invoke('text').as('productName');
 
});


Cypress.Commands.add('cleanWishlist', () => {
  cy.visit('/lista-de-desejos/');

  function removeWishlistItems() {
    cy.get('.wishlist_table tbody tr').then(($rows) => {
      if ($rows.length > 0) {
        removeItem($rows);
      } else {
        cy.get('.wishlist-empty').should('be.visible');
      }
    });
  }

  function removeItem($rows) {
    if ($rows.length > 0) {
      cy.wrap($rows[0]).then($row => {
        if ($row.find('.remove > .fa').length > 0) {
          cy.wrap($row)
            .find('.remove > .fa')
            .click({ force: true })
            .then(() => {
              cy.wait(1000); // Aguarda 1 segundo para garantir que o item foi removido
              cy.get('.wishlist_table tbody tr').then(($updatedRows) => {
                if ($updatedRows.length > 0) {
                  removeItem($updatedRows);
                } else {
                  cy.get('.wishlist-empty').should('be.visible');
                }
              });
            });
        } else {
          cy.get('.wishlist-empty').should('be.visible');
        }
      });
    } else {
      cy.get('.wishlist-empty').should('be.visible');
    }
  }

  cy.get('body').then(($body) => {
    if ($body.find('.wishlist-empty').length > 0) {
      cy.log('A lista de desejos já está vazia. Nenhum item para remover.');
    } else {
      removeWishlistItems();
    }
  });
});

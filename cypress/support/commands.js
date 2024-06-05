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

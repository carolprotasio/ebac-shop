/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade de Login e seu fluxo', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        
    });
    it('Deve realizar o Login com Sucesso', () => {        
        cy.validLogin()
        
    });
    it.only('Senha inválida - Deve apresentar erro', () => {     
        const password = faker.internet.password();   
        cy.invalidPassword(password)
        
    });
    it('Usuário não cadastrado - Deve apresentar erro', () => {  
        const email = faker.internet.email();   
        const password = faker.internet.password();   
        cy.notRegister(email, password)
        
    });
});
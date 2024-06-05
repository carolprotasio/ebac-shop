/// <reference types="cypress" />

import faker from "faker";

describe('Funcionalidade da Perda de Senha e seu fluxo', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/my-account/');
        
    });
  
    it('Redifinir Senha - Senha Perdida ', () => {     
        const password = faker.internet.password();   
        cy.loginAndLostPassword(password)
    });
  
});
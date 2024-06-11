
import faker from "faker";

Cypress.Commands.add('generateUserData', () => {

    const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        company: faker.company.companyName(),
        country: 'Estados Unidos', 
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: 'Califórnia',
        zipCode: faker.address.zipCode(),
        phoneNumber: 113244578
    };

    cy.writeFile('cypress/fixtures/userData.json', userData);

    return cy.wrap(userData);

      
  });

Cypress.Commands.add('fillBillingDetails', (userData) => {
    console.log('userData', userData); 
    cy.get('#billing_first_name').clear().type(userData.firstName);
    cy.get('#billing_last_name').clear().type(userData.lastName);
    cy.get('#billing_company').clear().type(userData.company);
    cy.get('#select2-billing_country-container').type(`${userData.country}{enter}`);
    cy.get('#billing_address_1').clear({ force: true }).type(userData.address);
    cy.get('#billing_city').clear({ force: true }).type(userData.city);

    cy.get('#select2-billing_state-container').click();
    cy.get('.select2-dropdown').contains(userData.state).click();

    cy.get('#billing_postcode').clear({ force: true }).type(userData.zipCode);
    cy.get('#billing_phone').clear({ force: true }).type(userData.phoneNumber);
    
});
 

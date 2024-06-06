
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

 

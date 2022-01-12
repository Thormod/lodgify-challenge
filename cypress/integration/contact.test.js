import ContactPageSelectors from "../selectors/contact-page.selectors";

context('Contact Tests', () => {
    beforeEach(() => {
        cy.visit('/contact.html');
    });

    const contactPageSelectors = new ContactPageSelectors();

    describe('given a user filling contact data', () => {
        before(() => {
            // Arrange
            cy.intercept('https://websiteserver.lodgifyintegration.com/v2/websites/contact/website/317320', {
                statusCode: 200,
                body: {},
            });

            cy.clock(Date.UTC(2021, 12, 12), ['Date']);
        });

        describe('when the user correctly fills all inputs', () => {
            it('then a confirmation message should appear with the text <Your request has been sent successfully>', () => {
                // Act
                cy.get(contactPageSelectors.nameInput).clear().type('Sebastian Zapata');
                cy.get(contactPageSelectors.phoneSelect).select('CO');
                cy.get(contactPageSelectors.phoneInput).clear().type('3017498115')
                cy.get(contactPageSelectors.emailInput).clear().type('jszapata94@gmail.com');
                cy.get(contactPageSelectors.guestInput).clear().type('10');
                cy.get(contactPageSelectors.arrivalDateInput).type("11/01/2022")
                cy.get(contactPageSelectors.departureDateInput).type("20/01/2022")
                cy.get(contactPageSelectors.commentTextarea).type("These are not my favorites selectors but as the FE for contact is a jungle and I prefer to do this xD")
                cy.get(contactPageSelectors.sendButton).contains('Send').click();

                // Assert
                cy.contains('Your request has been sent successfully.').should('be.visible');
            });
        });

        describe('when the user left the name, email and comment inputs empty', () => {
            it('then a warning div is displayed for each element and the submit button should be disabled', () => {
                // Act
                cy.get(contactPageSelectors.sendButton).contains('Send').as('submitButton');
                cy.get('@submitButton').click();

                // Assert
                cy.get('div').contains('Name is mandatory').should('be.visible');
                cy.get('div').contains('Email is mandatory').should('be.visible');
                cy.get('div').contains('Comment is mandatory').should('be.visible');
                cy.get('@submitButton').should('be.disabled');
            });
        });
    });
});

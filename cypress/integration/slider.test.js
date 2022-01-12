import PricingPageSelectors from "../selectors/pricing-page.selectors";
import * as testData from '../fixtures/testData.json';

context('Slider Tests', () => {
    before(() => {
        cy.visit('/pricing.html');
    });

    const pricingPageSelectors = new PricingPageSelectors();

    describe('given a user selecting a vacation rental', () => {
        testData.currencies.forEach((currency) => {
            const selectedCurrency = currency.option;
            describe(`when the user selects ${selectedCurrency} as currency`, () => {
                before(() => {
                    cy.get(pricingPageSelectors.currencySelector).select(selectedCurrency);
                })
                const currencyPeriods = currency.data;

                currencyPeriods.forEach((timePeriod) => {
                    const selectedTimePeriod = timePeriod.type;
                    describe(`and the user selects ${selectedTimePeriod} as time period`, () => {
                        before(() => {
                            cy.get(pricingPageSelectors.getTimePeriodButton(selectedTimePeriod)).click();
                        })
                        timePeriod.data.forEach((numberOfRentalData) => {
                            describe(`and the user selects ${numberOfRentalData.numberOfRentals} as number of rentals`, () => {
                                const starterPrice = numberOfRentalData.starterPrice;
                                const professionalPrice = numberOfRentalData.professionalPrice;
                                const ultimatePrice = numberOfRentalData.ultimatePrice;

                                it(`then the user should see ${starterPrice} as starter price, ${professionalPrice} 
                                as professional price and ${ultimatePrice} as ultimate price`, () => {
                                    // Act
                                    cy.get(pricingPageSelectors.sliderInput).clear().type(numberOfRentalData.numberOfRentals);

                                    // Assert
                                    cy.get(pricingPageSelectors.starterTotalSum).should('contain.text', starterPrice);
                                    cy.get(pricingPageSelectors.professionalTotalSum).should('contain.text', professionalPrice);
                                    cy.get(pricingPageSelectors.ultimateTotalSum).should('contain.text', ultimatePrice);
                                });
                            })
                        });
                    });
                });
            });
        });
    });
});

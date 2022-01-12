export default class PricingPageSelectors {
    sliderInput = '[data-automation="slider-input"]';
    starterTotalSum = '[data-automation="starter-total-sum-label"]';
    professionalTotalSum = '[data-automation="professional-total-sum-label"]';
    ultimateTotalSum = '[data-automation="ultimate-total-sum-label"]';
    currencySelector = '[data-automation="currency-selector"]';
    getTimePeriodButton( timePeriod ) {
        return `[data-automation="${timePeriod}-button"]`;
      }
}

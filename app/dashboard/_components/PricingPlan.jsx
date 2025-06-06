// Pricing plans data

const pricingPlans = [
  {
    id: 'basic',
    link: 'https://buy.stripe.com/test_00w4gzdZM0qV7HvbgN53O00',
    price: 7.99,
    priceId: 'price_1RNfwoDR8rWHnLWcYoadcR6G',
    duration: 'Monthly',
    description: 'Perfect for individual learners getting started',
    popular: false
  },
  {
    id: 'premium',
    link: 'https://buy.stripe.com/test_5kQaEXcVIflP1j7esZ53O01',
    price: 49.00,
    priceId: 'price_1RNfxmDR8rWHnLWchWJGLZ6q',
    duration: 'Yearly',
    description: 'Best for regular learners and professionals',
    popular: false
  }
]

export { pricingPlans }
export default pricingPlans

// Pricing plans data

const pricingPlans = [
  {
    id: 'monthly',
    link: '/api/billing/monthly',
    price: 7.99,
    duration: 'Monthly',
    description: 'Perfect for individual learners getting started',
    popular: false
  },
  {
    id: 'yearly',
    link: '/api/billing/yearly',
    price: 49.00,
    duration: 'Yearly',
    description: 'Best for regular learners and professionals',
    popular: false
  }
]

export { pricingPlans }
export default pricingPlans

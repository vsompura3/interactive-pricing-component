const pricingSlider = document.querySelector('#price-range')
const priceToggle = document.querySelector('#price-toggle')
const pageViewEl = document.querySelector('.pricing-selection > p')
const priceEl = document.querySelector('.price > span')
const discountBadge = document.querySelector('.pricing-toggle > p')

const state = {
  currentPlan: priceToggle.checked ? 'annual' : 'monthly',
  discountPercentage: 0.25,
  1: { pageviews: '10K', monthlyPrice: 8 },
  2: { pageviews: '50K', monthlyPrice: 12 },
  3: { pageviews: '100K', monthlyPrice: 16 },
  4: { pageviews: '500k', monthlyPrice: 24 },
  5: { pageviews: '1M', monthlyPrice: 36 },
  currentPlanPrice: pricingSlider.value,
}

for (let i = 1; i <= pricingSlider.max; i++) {
  state[i].annualPrice =
    state[i].monthlyPrice * 12 -
    state[i].monthlyPrice * 12 * state.discountPercentage

  state[i].currentPlan = {
    monthly: state[i].monthlyPrice,
    annual: state[i].annualPrice,
  }
}

function setSliderHighlight() {
  const percentage = ((pricingSlider.value - 1) / (pricingSlider.max - 1)) * 100
  pricingSlider.style.setProperty('--_highlight-fill', `${percentage}%`)
}

function checkForPlan() {
  if (priceToggle.checked) {
    priceEl.innerHTML = `$${state[state.currentPlanPrice].annualPrice.toFixed(
      2,
    )}`
  } else {
    priceEl.innerHTML = `$${state[state.currentPlanPrice].monthlyPrice.toFixed(
      2,
    )}`
  }
}

function browsePlans() {
  state.currentPlanPrice = this.value
  pageViewEl.innerHTML = `${state[state.currentPlanPrice].pageviews} pageviews`
  checkForPlan()
  setSliderHighlight()
}

priceToggle.addEventListener('change', checkForPlan)
pricingSlider.addEventListener('input', browsePlans)

function changeDiscountBadge() {
  if (window.innerWidth > '480') {
    discountBadge.textContent = '25% Discount'
  } else {
    discountBadge.textContent = '-25%'
  }
}

window.onload = changeDiscountBadge
window.addEventListener('resize', changeDiscountBadge)

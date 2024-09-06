
// Optional
RebillyInstruments.on("instrument-ready", (instrument) => {
	console.info("instrument-ready", instrument);
});
RebillyInstruments.on("purchase-completed", (purchase) => {
	console.info("purchase-completed", purchase);
});

const state = {
	billingPeriod: "monthly",
	donationForm: document.getElementById('donation-form'),
	checkoutForm: document.getElementById('checkout-form'),
	donationAmount: null,
	billingPeriodMonthlySwitch: document.getElementById('monthly-billing-switch'),
	billingPeriodOnetimeSwitch: document.getElementById('onetime-billing-switch'),
	submitButton: document.getElementById('submit')
};

function handleBillingPeriodButtonClick(newBillingPeriod) {
	if (state.billingPeriod === newBillingPeriod) {
		return;
	}

	// clear previous active class
	const buttons = [
		state.billingPeriodMonthlySwitch,
		state.billingPeriodOnetimeSwitch
	];

	buttons.forEach(button => {
		if (button.classList.contains('btn-active')) {
			button.classList.remove('btn-active');
		}
	})

	// select new active button
	const activeButton = newBillingPeriod === 'monthly' ? state.billingPeriodMonthlySwitch : state.billingPeriodOnetimeSwitch;

	activeButton.classList.add('btn-active');

	// update billing period

	state.billingPeriod = newBillingPeriod
}

function handleFormSubmission() {
	const donationAmount = Number(document.getElementById('donation-amount').value);

	if (!donationAmount) {
		alert('Please enter a donation amount');
		return;
	}

	state.donationForm.classList.add('hidden');
	state.checkoutForm.classList.remove('hidden');

	if (state.billingPeriod === 'onetime') {
		RebillyInstruments.mount({
			publishableKey: "pk_sandbox_VGoV6xf8qRVq0FvRkz36BzW2nBjThgXVL_gEXgp",
			organizationId: "phronesis-gulliver-s-gallivants",
			websiteId: "www.rebilly.com-",
			apiMode: "sandbox",
			money: {
				amount: donationAmount,
				currency: "USD",
			},
		});
	} else {
		// TBD instruments config if monthly
	}
}


state.billingPeriodMonthlySwitch.addEventListener("click", () => {
	handleBillingPeriodButtonClick('monthly');
})

state.billingPeriodOnetimeSwitch.addEventListener("click", () => {
	handleBillingPeriodButtonClick('onetime');
})

state.submitButton.addEventListener("click", handleFormSubmission);
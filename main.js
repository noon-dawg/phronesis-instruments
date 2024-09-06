// RebillyInstruments.mount({
// 	publishableKey: "pk_sandbox_VGoV6xf8qRVq0FvRkz36BzW2nBjThgXVL_gEXgp",
// 	organizationId: "phronesis-gulliver-s-gallivants",
// 	websiteId: "www.rebilly.com-",
// 	apiMode: "sandbox",
// 	money: {
// 		amount: 100,
// 		currency: "USD",
// 	},
// });
// Optional
RebillyInstruments.on("instrument-ready", (instrument) => {
	console.info("instrument-ready", instrument);
});
RebillyInstruments.on("purchase-completed", (purchase) => {
	console.info("purchase-completed", purchase);
});

const state = {
	billingPeriod: "monthly",

	billingPeriodSwitch: document.getElementById("switch"),
};

async function handlePlans() {
	const newBillingPeriod = state.billingPeriod === "monthly" ? "yearly" : "monthly";

	if (newBillingPeriod === "monthly") {
		await RebillyInstruments.update({
			items: [
				{
					planId: "monthly-membership",
					quantity: 1,
				},
			],
			bumpOffer: [
				{
					planId: "monthly-membership-plat",
					quantity: 1,
				},
			],
		});
	} else {
		await RebillyInstruments.update({
			items: [
				{
					planId: "yearly-membership",
					quantity: 1,
				},
			],
			bumpOffer: [
				{
					planId: "yearly-membership-plat-plan",
					quantity: 1,
				},
			],
		});
	}
	state.billingPeriod = newBillingPeriod;
	state.billingPeriodSwitch.innerHTML = state.billingPeriod === "monthly" ? "Switch to yearly plan" : "Switch to monthly plan";
}

state.billingPeriodSwitch.addEventListener("click", handlePlans);

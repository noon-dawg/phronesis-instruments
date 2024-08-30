RebillyInstruments.mount({
    publishableKey: 'pk_sandbox_VGoV6xf8qRVq0FvRkz36BzW2nBjThgXVL_gEXgp',
    organizationId: 'phronesis-gulliver-s-gallivants',
      websiteId: 'www.rebilly.com-',
      apiMode: 'sandbox',
      paymentInstruments: {
      address: {
        show: ['all'],
        require: ['organization', 'address', 'address2', 'city', 'email', 'phoneNumber','region', 'postalCode', 'country'],
      }

      },
      items: [
          {
              planId: 'monthly-membership',
              quantity: 1
          },
      ],
        addons: [
        {
            planId: 'personal-travel-plan',
            quantity: 1,
        },
      ],
      bumpOffer: [
        {
        planId: 'monthly-membership-plat',
        quantity: 1,
        },
     ],
      theme: {
        colorPrimary: '#504CCA', // Brand color
        colorText: '#CEE8F3',
        colorDanger: '#cd5c5c',
        colorBackground: '#021311', // Website background color
        buttonColorText: '#1ABBC7',
        fontFamily: 'Trebuchet MS, sans-serif' // Website font family
    }
});
// Optional
RebillyInstruments.on('instrument-ready', (instrument) => {
    console.info('instrument-ready', instrument);
});
RebillyInstruments.on('purchase-completed', (purchase) => {
    console.info('purchase-completed', purchase);
});

const state = {

    billingPeriod: 'monthly',

    billingPeriodSwitch: document.getElementById('switch'),
}

async function handlePlans() {

    const newBillingPeriod = state.billingPeriod === 'monthly' ? 'yearly' : 'monthly';

    if (newBillingPeriod === 'monthly') {

        await RebillyInstruments.update({
            items: [
                {
                    planId: 'monthly-membership',
                    quantity: 1
                },
            ],
            bumpOffer: [
                {
                    planId: 'monthly-membership-plat',
                    quantity: 1,
                },
            ],
        });

    }else{

        await RebillyInstruments.update({
            items: [
                {
                    planId: 'yearly-membership',
                    quantity: 1
                },
            ],
            bumpOffer: [
                {
                    planId: 'yearly-membership-plat-plan',
                    quantity: 1,
                },
            ],
        });
    }
    state.billingPeriod = newBillingPeriod;
    state.billingPeriodSwitch.innerHTML = state.billingPeriod === 'monthly' ? 'Switch to yearly plan' : 'Switch to monthly plan';

}

state.billingPeriodSwitch.addEventListener('click', handlePlans);
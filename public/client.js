const customerId = "123456789000";

async function requestDeposit() {
	const response = await fetch("/deposit-request", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ customerId }),
	});
	const { token, depositRequestId } = await response.json();

	RebillyInstruments.mount({
        apiMode: "sandbox",
        deposit: {
            depositRequestId,
        },
        jwt: token,
    });
}

requestDeposit();
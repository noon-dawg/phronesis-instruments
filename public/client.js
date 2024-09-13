const customerId = "cus_01J5DFFAZZV96Z95BWZJP28Ybb";

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
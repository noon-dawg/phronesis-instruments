const customerId = "cus_01J5DFFAZZV96Z95BWZJP28Y86";

(async () => {
	const response = await fetch("/deposit-request", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ customerId }),
	});
	const { token, depositRequestId } = await response.json();

	// Mount Rebilly Instruments

})();

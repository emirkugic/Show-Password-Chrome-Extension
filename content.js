function isRevealEnabled(callback) {
	chrome.storage.local.get("passwordRevealEnabled", (data) => {
		callback(data.passwordRevealEnabled !== false);
	});
}

document.addEventListener("mouseover", function (event) {
	isRevealEnabled((enabled) => {
		if (!enabled) return;

		const target = event.target;

		if (
			target.tagName.toLowerCase() === "input" &&
			target.type === "password"
		) {
			target.type = "text";
		}

		if (target.getAttribute("data-original-type") === "password") {
			target.setAttribute("data-original-value", target.value);
			target.value = target.getAttribute("data-reveal-value");
		}
	});
});

document.addEventListener("mouseout", function (event) {
	isRevealEnabled((enabled) => {
		if (!enabled) return;

		const target = event.target;

		if (
			target.tagName.toLowerCase() === "input" &&
			target.type === "text" &&
			!target.getAttribute("data-original-type")
		) {
			target.type = "password";
		}

		if (target.getAttribute("data-original-type") === "password") {
			target.value = target.getAttribute("data-original-value");
		}
	});
});

function scanForCustomPasswordFields() {
	const inputs = document.querySelectorAll('input[type="text"]');
	inputs.forEach((input) => {
		const value = input.value;

		if (value && value.split("").every((char) => char === "*")) {
			input.setAttribute("data-original-type", "password");
			input.setAttribute(
				"data-reveal-value",
				input.getAttribute("data-password")
			);
		}
	});
}

scanForCustomPasswordFields();
setInterval(scanForCustomPasswordFields, 2000);

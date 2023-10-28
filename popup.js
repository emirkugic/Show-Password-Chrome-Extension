const toggleReveal = document.getElementById("toggleReveal");

chrome.storage.local.get("passwordRevealEnabled", (data) => {
	toggleReveal.checked = data.passwordRevealEnabled !== false;
});

toggleReveal.addEventListener("change", (event) => {
	chrome.storage.local.set({ passwordRevealEnabled: event.target.checked });
});

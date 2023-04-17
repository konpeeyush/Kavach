// content.js

// Add a message listener to receive messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'phishingDetected') {
        // Display a warning on the page to alert the user about the detected phishing attempt
        var warningDiv = document.createElement('div');
        warningDiv.style.position = 'fixed';
        warningDiv.style.top = 0;
        warningDiv.style.left = 0;
        warningDiv.style.width = '100%';
        warningDiv.style.backgroundColor = 'red';
        warningDiv.style.color = 'white';
        warningDiv.style.padding = '16px';
        warningDiv.style.fontSize = '16px';
        warningDiv.textContent = 'Warning: The URL ' + request.url + ' may be a phishing site.';
        document.body.appendChild(warningDiv);
    }
});

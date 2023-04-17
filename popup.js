// In popup.js

// Add event listener to the check button
document.getElementById('checkButton').addEventListener('click', async () => {
    // Get the input URL from the input field
    const url = document.getElementById('urlInput').value;

    // Make a request to the Safe Browsing API
    const apiKey = 'AIzaSyCFNrAs99EdI2vAb8vNOyBvRkykitqNhp8'; // Replace with your actual API key
    const apiEndpoint = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';
    const body = JSON.stringify({
        client: {
            clientId: 'my-extension',
            clientVersion: '1.0.0'
        },
        threatInfo: {
            threatTypes: ['SOCIAL_ENGINEERING', 'MALWARE'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url: url }]
        }
    });

    try {
        const response = await fetch(`${apiEndpoint}?key=${apiKey}`, {
            method: 'POST',
            body: body
        });

        // Check for a successful response
        if (response.ok) {
            const data = await response.json();
            // Check if the response indicates a phishing threat
            if (data && data.matches && data.matches.length > 0) {
                // Send a message to content.js with the URL and action
                chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { url, action: 'phishingDetected' });
                });
                document.getElementById('resultDiv').textContent = 'Phishing detected!';
            } else {
                document.getElementById('resultDiv').textContent = 'No phishing detected.';
            }
        } else {
            throw new Error('Failed to fetch data from the Safe Browsing API');
        }
    } catch (error) {
        console.error(error);
        document.getElementById('resultDiv').textContent = 'Error occurred during phishing detection.';
    }
});

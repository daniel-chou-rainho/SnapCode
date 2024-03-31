document.getElementById('runCodeBtn').addEventListener('click', function() {
    fetch('/run-code', { // This should point to your server-side endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            language: "python",
            version: "3.8",
            files: [{
                name: "main.py",
                content: "num = 9\nprint(num > 10)"
            }]
        })
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the API response includes 'stdout' in its JSON response
        document.getElementById('output').textContent = `Result: ${data.stdout}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

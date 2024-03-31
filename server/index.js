import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve files from the 'app' directory
app.use(express.static('../app'));

// Endpoint to run code
app.post('/run-code', async (req, res) => {
    const glotResponse = await fetch('https://glot.io/api/run/python/latest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '45517610-7d26-4288-944c-6d5e1d2d9908'
        },
        body: JSON.stringify(req.body)
    });

    // Check if the response is ok (status in the range 200-299)
    if (!glotResponse.ok) {
        // If not ok, throw an error with the status
        throw new Error(`Fetch failed with status: ${glotResponse.status}`);
    }

    const data = await glotResponse.json();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

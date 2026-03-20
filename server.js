const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>🚀 Server is Online!</h1><p>Ngrok is working perfectly.</p>");
});

app.post('/callback', (req, res) => {
    console.log('--- MONEY RECEIVED! ---');
    console.log(JSON.stringify(req.body, null, 2));
    res.json({ "ResultCode": 0, "ResultDesc": "Accepted" });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
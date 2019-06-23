const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;

console.log('app');

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
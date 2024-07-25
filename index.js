// index.js
const app = require('./server');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
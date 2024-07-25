// server.js
const express = require('express');
const moment = require('moment')
const { callAPI } = require('./request');
const operations = require('./requestBody');
let { SHOPIFY_APP_API_TOKEN, ER_RESPONSE } = require('./config')
var cors = require('cors')
require('dotenv').config()
const app = express();
app.use(cors())
app.use(express.json());
const sendEmail = require('./mailServer.js');

// check status
app.post('/update-order', async (req, res) => {
    try {
        const { orderId, formFieldValue } = req.body;
        let requestBody = await JSON.stringify(operations['updateOrderMetaField'](orderId,formFieldValue));
        const record = await callAPI(requestBody, SHOPIFY_APP_API_TOKEN);
        res.status(record.status).json(record);
    } catch (error) {
        console.error('Error processing data:', error.message);
        ER_RESPONSE.message = error.message;
        res.status(ER_RESPONSE.status).json(ER_RESPONSE);
    }
});

app.post('/update-order-meta', async (req, res) => {
    try {
        const { orderId, formFieldValue } = req.body;
        console.log(orderId);
        let requestBody = await JSON.stringify(operations['updateOrderMetaObject'](orderId,formFieldValue));
        console.log(requestBody);
        const record = await callAPI(requestBody, SHOPIFY_APP_API_TOKEN);
        console.log(record);
        res.status(record.status).json(record);
    } catch (error) {
        console.error('Error processing data:', error.message);
        ER_RESPONSE.message = error.message;
        res.status(ER_RESPONSE.status).json(ER_RESPONSE);
    }
});

app.post('/send-email', async (req, res) => {
    const { to, subject, name, message, footer  } = req.body;
    try {
        let info = await sendEmail(to, subject, { name, message, footer });
        res.status(200).json({ message: 'Email sent', info: info });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error: error });
    }
});

console.log(moment().format('Y-MM-D'))


module.exports = app;
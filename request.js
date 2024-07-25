// request.js
const axios = require('axios');

const callAPI = async (requestBody, SHOPIFY_APP_API_TOKEN) => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SHOPIFY_BASE_URL}/api/unstable/graphql.json`,
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_APP_API_TOKEN,
                'Content-Type': 'application/json'
            },
            data: requestBody
        };

        const response = await axios.request(config)
            .then((response) => {
                response = {
                    status: response.status,
                    data: response.data.data
                }
                console.log(response);
                return response
            })
            .catch((error) => {
                error = {
                    status: error.response.status,
                    message: error.response.statusText,
                    data: error.response.data,
                    code: error.code
                }
                return error
            });
        console.log(response)
        return response;
    } catch (error) {
        throw new Error(`Request failed: ${error.message}`);
    }
};

module.exports = {
    callAPI
};

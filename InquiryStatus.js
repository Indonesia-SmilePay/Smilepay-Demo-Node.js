const moment = require("moment/moment");
const crypto = require('crypto');
const https = require('https');
const {hmacSHA512} = require("./Tools_Sign");
const {ACCESS_TOKEN,BASE_URL,MERCHANT_ID,INQUIRY_STATUS_API} = require("./Constants");

console.log("=====> inquiry Status");

const accessToken = ACCESS_TOKEN
const merchantId = MERCHANT_ID
const endPointUrl = INQUIRY_STATUS_API

const merchantNo = merchantId.replace("sandbox-", "S") + crypto.randomBytes(8).toString('hex');
const tradeNo = "101100012503031541003246"
const orderNo = null

const inquiryBalanceReq = {
    tradeType: 1,
    orderNo: orderNo,
    tradeNo: tradeNo
}
const jsonDataMinify = JSON.stringify(inquiryBalanceReq);
const timestamp = moment().format('YYYY-MM-DDTHH:mm:ssZ');
const signature = hmacSHA512("POST",
    endPointUrl,
    accessToken,
    jsonDataMinify,
    timestamp);

const options = {
    hostname: BASE_URL,
    port: 443,
    path: endPointUrl,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + accessToken,
        'X-TIMESTAMP': timestamp,
        'X-PARTNER-ID': merchantId,
        'X-SIGNATURE': signature,
        'ORIGIN': "www.yourDomain.com",
        'X-EXTERNAL-ID': merchantNo,
        'CHANNEL-ID': "95221"
    }
};

let responseData = '';
//post request
const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        try {
            const parsedResponse = JSON.parse(responseData);
            console.log('Parsed Response:', parsedResponse);
        } catch (error) {
            console.error('Failed to parse JSON:', error.message);
            console.log('Raw Response:', responseData);
        }
    });
});

req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

req.write(jsonDataMinify);
req.end();



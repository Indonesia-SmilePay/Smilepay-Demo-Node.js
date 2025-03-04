const moment = require("moment/moment");
const crypto = require('crypto');
const https = require('https');
const {hmacSHA512} = require("./Tools_Sign");
const {ACCESS_TOKEN,BASE_URL,MERCHANT_ID,PAY_IN_API, PAY_OUT_API} = require("./Constants");

console.log("=====> step6 : PayIn transaction");

const accessToken = ACCESS_TOKEN
const merchantId = MERCHANT_ID
const endPointUrl = PAY_OUT_API

const merchantNo = merchantId.replace("sandbox-", "S") + crypto.randomBytes(8).toString('hex');
const orderNo = merchantNo;
const paymentMethod = "BRI"
const paymentAmount = 10000
const cashAccount = "1233456"

const payInReq = {
    orderNo: orderNo,
    purpose: "Purpose For Transaction from python Demo",
    productDetail: "Product details",
    paymentMethod: paymentMethod,
    additionalParam: "other descriptions",
    cashAccount: cashAccount,
    itemDetailList: [
        {
            name: "mac A1",
            quantity: 1,
            price: paymentAmount
        }
    ],
    money: {
        currency: "IDR",
        amount: paymentAmount
    },
    merchant: {
        merchantId: merchantId
    },
    payer: {
        name: "paulo",
        email: "paulo@gmail.com",
        phone: "82-018922990",
        address: "Jalan Pantai Mutiara TG6, Pluit, Jakarta"
    },
    receiver: {
        name: "smilepay",
        email: "smilepay@gmail.com",
        phone: "82-018922990",
        address: "Jl. Pluit Karang Ayu 1 No.B1 Pluit"
    },

    billingAddress: {
        address: "Jl. Pluit Karang Ayu 1 No.B1 Pluit",
        city: "jakarta",
        postalCode: "14450",
        phone: "82-018922990",
        countryCode: "Indonesia"
    },
    shippingAddress: {
        address: "Jl. Pluit Karang Ayu 1 No.B1 Pluit",
        city: "jakarta",
        postalCode: "14450",
        phone: "82-018922990",
        countryCode: "Indonesia"
    },
   // callbackUrl: "https://www.yourDomain.com/callback",
}
const jsonDataMinify = JSON.stringify(payInReq);
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



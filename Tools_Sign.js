
const crypto = require('crypto');
const {MERCHANT_SECRET} = require("./Constants");

// Generating Signatures with Crypto
function sign(privateKeyStr, message) {
    //********** begin signature ***************
    const privateKeyData = Buffer.from(`${privateKeyStr}`, 'base64');
    const privateKey = crypto.createPrivateKey({
        key: privateKeyData,
        format: 'der',
        type: 'pkcs8',
    });
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    sign.end();
    const signature = sign.sign(privateKey);
    return signature.toString('base64');
}

function hmacSHA512(method, endPointUrl, accessToken, jsonDataMinify, timestamp) {
    console.log("jsonDataMinify=", jsonDataMinify);

    // calculate_sha256
    const byte2Hex = calculateSha256(jsonDataMinify);
    console.log("sha256 then byte2Hex=", byte2Hex);

    // lowercase_string
    const lowerCase = byte2Hex.toLowerCase();
    console.log("lowerCase=", lowerCase);

    // build
    const stringToSign = `${method}:${endPointUrl}:${accessToken}:${lowerCase}:${timestamp}`;
    console.log("stringToSign=", stringToSign);

    // signature
    const signature = calculateHmacSha512Base64(MERCHANT_SECRET, stringToSign);
    console.log("signature=", signature);
    return signature;
}

function getFormattedDatetime(timezoneStr) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Use system timezone if not provided
    const now = new Date();
    const options = { timeZone: timezoneStr || timezone, format: 'iso', timespec: 'seconds' };
    return now.toLocaleString('en-US', options);
}

function calculateSha256(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}

function calculateHmacSha512Base64(key, message) {
    const hmac = crypto.createHmac('sha512', key);
    hmac.update(message);
    const hashValue = hmac.digest();
    return hashValue.toString('base64');
}

module.exports = {
    sign,
    hmacSHA512
};

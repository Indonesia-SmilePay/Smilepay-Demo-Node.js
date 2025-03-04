const crypto = require('crypto');
const https = require('https');
const {MERCHANT_ID,BASE_URL,ACCESS_TOKEN_API} = require("./Constants");
const {sign} = require("./Tools_Sign");
const moment = require("moment/moment");



console.log('=====> step2 : Create Access Token');

//get privateKey from step1
const privateKeyStr = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKLGRhtFQeghjAVl0FUa8artenjI57cZxvo5OaZmTLoDgtMWAC4T38RQ6I5nQFYP1LZlgHZlYxD0s8eI2gg3YgIW+D5BUBmZefvyl0ZtVrNRAGTeMxMa8k0fyJhlm2cIi181Xim7n5jHaIrrD6e7+B2StMOUlYgf/qEEQIb9MUgKMVECZBMwlbJHDsEjp9f/bPecQLYi6bkbVDo2Io3m1apG4Um2v8hykNvIsI6hY8FY9i+bXFYqS6x+F41w10S4BUVMprFlihPdzv/jqYDITSZciGZrGQPtZfpvKApb/5TCTOQZ1MXVyHAZn9VYOsfAQnUL83k9eZoZkU8YDzrrDTAgMBAAECggEAAhhN3ZTrFQcMSM+JFp+4wxVSII2izlTbjGz//9oVK+aYBNPdprn8+ySGC+7pzEJ4hw1jVrqw18CzHi6YaedJOpHOIFClOeDrD5mazUN7IHZdmT5TK9sHCxUhjkh2A1KmmZtEMqoIowIMs/1Ha5kLrEWuHq1hsEj/xPk9LNWbAaJDSQFJnO+GfEHaYZJlr5tFGu1Q4Z++lkfoRGeIew4BB6F2m/hMLpsbRTxBQxmifTQoI3L37q4GALWEC1fcTso4Yw1p6L+kjsPCnfQ70HZW+VymBUPSBZpfYNo2e4UFVDFmo9DgGjI+Mll4snLjacAaT0/YQ6DjRdsyDSh/EpSKBQKBgQDYQhmH55za64bn/T5fWpoYrdhdPeag0o11nPWLL9niu+vA1xsPrvDFeY9S8AZRXm/fwqQe1Q/vADRBspbuwIwbCoSnFrrhMYTiPjiaaxC2P6CNsk6b39BBkpfls8DHsDQo93lt2YgzANX7imvJ+qaQ184/V5VllVTbUeBV1wbS5QKBgQDvU6vIhirs9oStmkgNzLOc/f+3WJMcO4Ee2a7TUhn1jZwMts7AKTbWDHVCStbhdpqpoVl6uSbDBgn48XMHf922dc4d6lV4aekWZXRJoAOsAS0hE49wMNRyCPZrtYVjysKM0KtXHc8YfOiwddveBRmyaOWdI00UqZzh0VYRHB+hVwKBgHkjdbe6VxQOkRBMvG6fiug+IZABh7oYl6MFXEoucMfgamwoUoFTho2nzVAxIejclKBsIJEg2n8PxzXx+zgcZZ8UIkCSq/ZPTdeJ8R0W0lK0i5Q0CHKqSbchjbLfISL6og08qymMjA297x+rZzvKCxnhuSekQQyZPOJqF9cdzzW9AoGBALp4j/UqjJGbNh9pgVC3OQ9OXIsHiX/K4T0fUPc4Fh/cGUVSvl68/gvjIw3m7+w2FCWtIOHdF1WHBAgiYITsXNyIh3OJnNS4eLNJk0S2V4YSWI5YBj/c2/qJ/y5G/cqWNeWvxICZKj4jPM4Y1pnzkWUQFC/OTIWX7jOIfq3QItj7AoGBAIyEz8W1nAmJy/memRayZ719foYymp9rO7fY0cc0SUtFNkmMz3Jdvy0Rh36x8/b0e3IKJxElm7E/+y5sfnZAt1ZgYmcpqMXz1bfl7Y5514lO0vJcWZ0aM/4/CUUoCqBdPoTJmIM+3qJTh0gApsOo8YFnL2SlXHrw0JxiK2F9zWMi';
//get time
const timestamp = moment().format('YYYY-MM-DDTHH:mm:ssZ');

//get merchantId from merchant platform
const clientKey = MERCHANT_ID;
//build string to sign
const stringToSign = clientKey + '|' + timestamp;

const signature = sign(privateKeyStr,stringToSign);
console.log(signature);

// post body
const postData = JSON.stringify({
  grantType: 'client_credentials'
});

//options  you have changge hostname, timestamp, clientKey
const options = {
  hostname: BASE_URL,
  port: 443,
  path: ACCESS_TOKEN_API,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-TIMESTAMP': timestamp,
    'X-CLIENT-KEY': clientKey,
    'X-SIGNATURE': signature
  }
};

//post request
const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);

  res.on('data', (chunk) => {
    console.log(`Response Body: ${chunk}`);
  });
});

req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

req.write(postData);
req.end();
//********** end post ***************

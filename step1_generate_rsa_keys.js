const crypto = require('crypto');

// 生成RSA密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

// 将私钥和公钥进行Base64编码并输出为字符串
const encodedPrivateKey = Buffer.from(privateKey.export({ type: 'pkcs8', format: 'der' })).toString('base64');
const encodedPublicKey = Buffer.from(publicKey.export({ type: 'spki', format: 'der' })).toString('base64');

console.log("Base64 Encoded Private Key:");
console.log(encodedPrivateKey + "\n");

console.log("Base64 Encoded Public Key:");
console.log(encodedPublicKey);

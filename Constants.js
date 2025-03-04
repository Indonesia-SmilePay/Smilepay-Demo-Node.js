// constants.js
module.exports = {
    CURRENCY: "IDR",
    F_0: "yyyy-MM-dd'T'HH:mm:ssXXX",

    // from merchant platform: merchantId
    MERCHANT_ID: "10001",

    // from merchant platform: merchantId
    MERCHANT_SECRET: "f4d768ef584ad56b5851ff071b5020f7a7e601ff912f7757cc3ef97e5808e44a",

    // SANDBOX URL. From docs API
    BASE_SANDBOX_URL: "sandbox-gateway.smilepay.id",

    // PRODUCTION URL. From docs API. If you pass the sandbox docking, you can switch the URL to production.
    BASE_URL: "gateway.smilepay.id",

    // from docs API
    ACCESS_TOKEN_API: "/v1.0/access-token/b2b",

    // from docs API
    PAY_IN_API: "/v1.0/transaction/pay-in",

    // from docs API
    PAY_OUT_INQUIRY_PAYMENT_METHOD_API: "/v1.0/disbursement/inquiry-paymentMethod",

    PAY_OUT_INQUIRY_ACCOUNT_API: "/v1.0/disbursement/inquiry-account",

    INQUIRY_BALANCE_API: "/v1.0/inquiry-balance",

    INQUIRY_STATUS_API: "/v1.0/inquiry-status",

    // from docs API
    PAY_OUT_API: "/v1.0/disbursement/cash-out",

    ACCESS_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3NDEwNjY0MzcsImV4cCI6MTc0MTA2NzMzNywiaWF0IjoxNzQxMDY2NDM3LCJNRVJDSEFOVF9JRCI6IjEwMDAxIn0.21UBIYzj6qcCzIYh9O_Fx8dLR_noh5SvMDTuDcJFfws"
};

const axios = require('axios');

const consumerKey = 'CAAfANNgf1SIDiuCa1cZ9TwGdggeTBkabaDgKK1JcKx2rZhC';
const consumerSecret =
  'mrqyhGuruL1pNb7qDTBE4GHhItc6DFOhbw9oWgzFGmkGyHMnbII5DCOrG1qE3gBl';
const myPhoneNumber = '254790195109'; 

const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

async function main() {
  try {
    const tokenResponse = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const accessToken = tokenResponse.data.access_token;
    console.log('Token Secured!');

    const shortCode = '174379';
    const passkey =
      'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);
    const password = Buffer.from(shortCode + passkey + timestamp).toString(
      'base64'
    );

    const stkPayload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: 1,
      PartyA: myPhoneNumber,
      PartyB: shortCode,
      PhoneNumber: myPhoneNumber,
      CallBackURL: 'https://7e58-41-209-14-100.ngrok-free.app/callback', 
      AccountReference: 'DarajaLearning',
      TransactionDesc: 'First Payment',
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPayload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    console.log('SUCCESS! Response from Safaricom:', response.data);
  } catch (error) {
    console.error(
      'ERROR:',
      error.response ? error.response.data : error.message
    );
  }
}

main();

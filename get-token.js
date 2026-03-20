const axios = require('axios');

const consumerKey = "CAAfANNgf1SIDiuCa1cZ9TwGdggeTBkabaDgKK1JcKx2rZhC";
const consumerSecret = "mrqyhGuruL1pNb7qDTBE4GHhItc6DFOhbw9oWgzFGmkGyHMnbII5DCOrG1qE3gBl";

const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

async function getAccessToken() {
  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );
    console.log("Your Access Token:", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error.response.data);
  }
}

getAccessToken();
# Daraja API Test

A Node.js project for integrating with Safaricom's **Daraja API** (M-Pesa) in the sandbox environment. This project demonstrates how to authenticate, trigger STK Push payments, and handle payment callbacks.

## Features

- Fetch an OAuth access token from Daraja API
- Trigger an STK Push (Lipa Na M-Pesa Online) request
- Express server to receive and log M-Pesa payment callbacks
- Ngrok integration for exposing the local callback URL

## Project Structure

```
├── get-token.js   # Fetch and print an OAuth access token
├── index.js       # Trigger an STK Push payment request
├── server.js      # Express server for handling M-Pesa callbacks
├── app.js
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- A [Safaricom Developer](https://developer.safaricom.co.ke/) account with a sandbox app
- [Ngrok](https://ngrok.com/) (to expose your local server for callbacks)

## Setup

1. **Clone the repository and install dependencies:**

   ```bash
   npm install
   ```

2. **Configure your credentials** in `index.js` and `get-token.js`:

   ```js
   const consumerKey = 'YOUR_CONSUMER_KEY';
   const consumerSecret = 'YOUR_CONSUMER_SECRET';
   ```

3. **Update your phone number and callback URL** in `index.js`:

   ```js
   const myPhoneNumber = '2547XXXXXXXX';
   // ...
   CallBackURL: 'https://YOUR_NGROK_URL/callback',
   ```

## Usage

### 1. Start the callback server

```bash
node server.js
```

### 2. Expose the server with Ngrok

```bash
ngrok http 3000
```

Copy the generated Ngrok HTTPS URL and update `CallBackURL` in `index.js`.

### 3. Fetch an access token (optional test)

```bash
node get-token.js
```

### 4. Trigger an STK Push

```bash
node index.js
```

The user's phone will receive an M-Pesa prompt. Once they confirm, the callback will be logged in the server console.

## Dependencies

| Package | Purpose |
|---------|---------|
| `express` | HTTP server for receiving M-Pesa callbacks |
| `axios` | HTTP client for Daraja API requests |

## Notes

- This project uses the **Safaricom sandbox** environment. Switch to production URLs and credentials when going live.
- Keep your `consumerKey` and `consumerSecret` out of version control — use environment variables in production.

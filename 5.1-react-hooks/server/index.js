import express from 'express';
import fetch from 'node-fetch'; // Use the built-in fetch API
import querystring from 'querystring';

const app = express();
const port = 3000;

const clientId = '308d6431f38e4a8bb9a9cb27f0a18b57';
const clientSecret = 'cd04a9c6e2854f83b646914795623da9';
const redirectUri = 'http://localhost:5173/callback'; // Your server's callback URL

app.get('/callback', async (req, res) => {
  const authorizationCode = req.query.code;

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: querystring.stringify({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  res.json({ accessToken });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
app.use(cors())
// const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL_AFTER_LOGIN } = require('../src/auth');


app.post('/refresh', (req,res) => {
const refreshToken = req.body.refreshToken
})

app.post('/login', (req, res) => {
    const code = req.body.code;
  
    const spotifyApi = new spotifyWebApi({
      redirectUri: 'http://localhost:3000/',
      clientId: '4ecb8bef7c0048c2b086bd189b368941',
      clientSecret: 'c7cc906641ee45479561ce92eea16a79',
    });
  
    spotifyApi.authorizationCodeGrant(code)
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch(error => {
        console.error("Spotify API Error:", error);
        res.status(400).send('Bad Request');
      });
  });
  

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

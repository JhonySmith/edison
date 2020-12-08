const firebase = require('firebase-admin');
require('firebase/auth');
require('firebase/database');

var serviceAccount = {
  type: 'service_account',
  project_id: 'edison-a2ee6',
  private_key_id: '51ff70efb0b8ba5ceeeaea15393e610a3561f6b4',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD38lb9a7MQ/fOl\n1o0QtHy+skB1aWEsHoO0uxS4SXgM5MQ9gA5Lb+lSDaFvvLbvBWCAvaRYv11OZUg5\nvgzHXRw6VeebuffsKFep2iL6PqZEYE2MFBb1yZqJ6WHtEh2WIB8jx5lAAGtyIEZO\nIOdHb/xSVH1JA/gGE8hUfwL6fqipqnut7906Zn4gbnfb3v5jSXr9QHiueoZ4gtUi\nJvsfQ9WpGpe8lOmLSctj89776XfLi3GZNCXY08VqGBQT6FxYic5aVYWW/NbU/F6y\n/p+Q5RQaAX9os+aesfo3lqv9jHf6c/C2r6itDd9RBuXOGNSv96xFwN+8EvKgfsFz\nmOD879ldAgMBAAECggEABaJMPLpCRDa+XxHRfG7aziB8cM6MsTUeTAXbkivFM7x3\nrb1nqxTSFJW6XzDGvVv+Fd7OnwpLeKO6MOmzHk1CKMcume4aBpPiGLocBQYAaYRW\nBBf+xOX9rM2QoT5B+C58Vqf166uMGs3wmweKCdMEb5XQ5PmsnJgS0MIJaMoQ/g3r\nX0Sfz03EwcmGC4Fx5Zm2y7jfMOyEfJ/nLt2r3UNRlJIYg9qOTVhULCZ8u8qmv+ps\nzveqWSoOiHMMCnPITFHyx17dzOucI7wZOle2+jiIfjjNgut5L0FHif28f45+8E/V\nF2+NSf0EimTPA+ZSFtqTU/ga/yrwFu9w90AcNiHl4QKBgQD+gnPmEEazGodC4M4E\niRA5qFYOloC6+ZFniOuLCgYULhKLLB5/XoCeqb1VqIflaXvu0fJGWnJzRj7cTwMr\nzYWWpqYhl187tyd7mJItDQauTvnGPbQqxEkdBWPuWEIFKdQOVeYLdw2XuYFJd6Nx\n5pshr+Ua6k80nI+yAcJJSjIDkQKBgQD5Zgxa4jl0SSgwP4t6M+l6neP7l37sranr\nMEdRNUVKFKiRZpc48LXGVLsnqZzm1fQ5kF2jpD60acXSkpXPmQq7rC6hb18UDVDs\n4imFHvTwKfy9Brqb1sbu6dW2LLK9g3LNu00dKTomg8dEQZmTEBLKRQtdV0qPXTTJ\nPpi2UD97DQKBgQDRC8myoI/RsOqE7i2J4CLpmPEGjmwyJ6ddCUOfMp6HmMg2dAig\nybiPmhAf+YuVzay0HtIHI2d6c6pSPrv2EJu3gC5YzQK2A9x0Un9ObbKdHdVfFXOU\n5SDAq5rHPMsNfqvlEn0f0avigcZF1/TyK14kr1tZXjesmSQWLAevNzgZYQKBgDaa\nxke70lKIlfkCYLpv1UXYfgse31ZYq6Rn3KWGIVaX8VRsft2jrljvQk7rzwOngqJ7\n3lSu6F+97Ocu2wgp/PScPVVxOgL862QCHI8d+QkAWGrWp1LpkoLKxdTuMnBV8HPk\n93xUA3xdS+rA5iwRz9tjhJp6O0PqZ11MjEkWht+dAoGAPpG49oeXlkvIAP2d6Na4\n4S3ZXU6pD4Y3t0kaT/L2vJGxduJ/0C9dZlbOYDBRGKPq2HYBALdlZRLF5kDstQK/\nfpUJR9GaRj18bxhsmc25ZfGEmlkz3fAU4rJFD9zllylSHkcw+LNRsab6dGaKF1tG\nvcZuZsUi0UYupSo/xwtwz0E=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-9ve5t@edison-a2ee6.iam.gserviceaccount.com',
  client_id: '117123042856826036270',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9ve5t%40edison-a2ee6.iam.gserviceaccount.com',
};

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://edison-a2ee6-default-rtdb.europe-west1.firebasedatabase.app',
});

const dataBase = firebase.database();

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3002;

app.use(cors());
app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});

app.post('/123', (request, response) => {
  dataBase.ref('event/123/').push({
    start: true,
  });

  console.log(request.body);
});

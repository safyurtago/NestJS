const express = require('express');
const body_parser = require('body-parser');
const twilio = require('twilio');

const app = express();

const sid = 'ACa1184dabf14daf688ca2d8964f301c1f';
const token = 'cc467f03a31f0ec13eb6d729d86e9de7';

const client = twilio(sid, token)
app.use(body_parser.urlencoded({ extended: false }))

app.post('/api/send-sms', (req, res) => {
  const {to, body} = req.body;
  client.messages.create({
    body: body,
    to: to,
    from: ''
  })
})

app.listen(9000)
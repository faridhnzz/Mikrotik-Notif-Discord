const express = require('express');
const app = express();
const cors = require('cors');
const { Webhook } = require('discord-webhook-node');

app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');

app.get('/', async (req, res) => {
  const fullUrl = `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://` + req.headers.host + req.originalUrl;
  return res.status(200).json({
    name: 'Mikrotik Notif Discord',
    author: 'Farid Nizam <me@farid.cyou>',
    description: 'Monitor your mikrotik devices for sending logs from hostpot/vpn/pppoe/netwatch/etc to your discord.',
    endpoint: `${fullUrl}[ID_WEBHOOK_DISCORD]/[TOKEN_WEBHOOK_DISCORD]/[YOUR_TEXT]`,
  });
});

app.get('/:id/:token/:text', async (req, res) => {
  const { id, token, text } = req.params;
  const hook = new Webhook(`https://discord.com/api/webhooks/${encodeURIComponent(id)}/${encodeURIComponent(token)}`);

  try {
    await hook.send(text);
    return res.status(200).send('Successfully sent webhook!');
  } catch (err) {
    return res.status(404).send('Parameters Not Set');
  }
});

module.exports = app;

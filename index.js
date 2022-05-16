import express from 'express';
import { Webhook } from 'discord-webhook-node';
import cors from 'cors';

const app = express();
const PORT = 5400;
/** ---- Conf ------------------------------------------- */
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('etag', 'strong');

/** ---- Route ------------------------------------------ */
app.get('/', async (req, res) => {
  const fullUrl = `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://` + req.headers.host + req.originalUrl;
  return res.status(200).json({
    name: 'Mikrotik Notif Discord',
    author: 'Farid Nizam <me@farid.cyou>',
    description: 'Monitor your mikrotik devices for sending logs from hostpot/vpn/pppoe/netwatch/etc to your discord.',
    github: 'https://github.com/faridnizam/Mikrotik-Notif-Discord',
    endpoint: `${fullUrl}[ID_WEBHOOK_DISCORD]/[TOKEN_WEBHOOK_DISCORD]/[YOUR_TEXT]`,
  });
});

app.get('/:id/:token/:text', async (req, res) => {
  try {
    const { id, token, text } = req.params;
    const hook = new Webhook(`https://discord.com/api/webhooks/${encodeURIComponent(id)}/${encodeURIComponent(token)}`);
    const chat = text.replace(/\+/g, ' ');
    await hook.send(chat);

    return res.status(200).send('Successfully sent message!');
  } catch (err) {
    return res.status(404).send('Parameters Not Set');
  }
});

/** ---- Server ------------------------------------------ */

app.listen(process.env.PORT || PORT, function (err) {
  console.log(`Server listening on http://127.0.0.1:${process.env.PORT || PORT} `);
  console.log('\n');

  if (err) {
    console.log(err);
    process.exit(1);
  }
});

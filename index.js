const app = require('./app');
const IP = '127.0.0.1';
const PORT = process.env.PORT || 5400;

const startServer = async () => {
  app.listen(PORT, function (err) {
    console.log(`Server listening on http://${IP}:${PORT} `);
    console.log('\n');

    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
};

startServer();

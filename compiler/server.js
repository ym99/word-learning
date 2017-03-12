const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const compiler = webpack(config);

const app = express();
app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        quiet: true,
        hot: true,
        inline: true,
        lazy: false,
        publicPath: config.output.publicPath,
        stats: { colors: true },
}));

app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log
}));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../app/index-dev.html'));
});

app.get('/favicon.ico', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../docs/favicon.ico'));
});

app.get('/images/es.svg', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../docs/images/es.svg'));
});

app.get('/images/ru.svg', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../docs/images/ru.svg'));
});

app.get('/images/us.svg', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../docs/images/us.svg'));
});

require('http')
  .createServer(app)
  .listen(5000, (error) => {
    if (error) {
      console.log(error);
      return;
    }

    console.info('==> Listening at http://localhost:5000');
  }
);


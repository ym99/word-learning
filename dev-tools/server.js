const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

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

app.use(express.static('lib'));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../docs/index.html'));
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


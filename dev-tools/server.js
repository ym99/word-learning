const path = require('path');
const express = require('express');

const app = express();
const compiler = require('webpack')(require('./webpack.config'));
app.use(require('webpack-dev-middleware')(
    compiler, {
        noInfo: true,
        quiet: true,
        hot: true,
        inline: true,
        lazy: false,
        publicPath: '../docs/',
        stats: { colors: true },
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('lib'));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../docs/index.html'));
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


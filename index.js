const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

nunjucks.configure(
  'src/views', {
    autoescape: true,
    express: app
  }
);

const dir = `${__dirname}/src/routes/`;

const routes = fs.readdirSync(dir);

routes.map((route) => {
  return app.use(
    `/${route.replace('.js', '')}`,
    require(`${dir}${route}`)
  )
});

// home
const title = '';
app.get('/', (req, res) => res.render(
  './index.html',
  { title: process.env.API_NAME }
));

// 404
app.use((req, res) => res.status(404).json(
  { error: 'Recurso não encontrado' },
));

app.listen(process.env.API_PORT, () => {
  console.log(`Running on ${process.env.API_PORT}`)
})

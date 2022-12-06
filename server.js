const path = require('path');
const express = require('express');
// Import express-session
const session = require('express-session');
// const exphbs = require('express-handlebars');

const routes = require('./routes');
const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: { originalMaxAge: 600000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
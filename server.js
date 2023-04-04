const express = require('express')
const session = require('express-session')
const app = express();
const exphbs = require('express-handlebars')
const hbs= exphbs.create()
const routes = require("./controllers")
const path = require('path');

const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialzied: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./controllers'))

// app.listen(PORT, () => {
//   console.log (`Listening App on port ${PORT}`);
//   sequelize.sync({ force: false});
// });

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Listening"));
});
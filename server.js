const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const routes = require('./controllers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const apikey= "5d8f706975b0652dc3b0077ecad2304a"

const sessionOptions = {
    secret: "secret",
    cookie: {maxAge:36000},
    resave : false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sessionOptions));
// Set Handlebars as the default template engine.

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use (express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


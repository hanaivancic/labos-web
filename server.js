var path = require("path");

var homeRoutes = require("./routes/home.routes");
var cartRoutes = require("./routes/cart.routes");

var express = require("express");
const session = require('express-session');

const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use(
    session({
        secret: "anything",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1800000 // 30 minuta u milisekundama
        }
    })
);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRoutes);
app.use('/cart', cartRoutes);

app.use('/', (req, res) => res.redirect("/home"));

app.listen(3000);
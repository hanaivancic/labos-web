const express = require("express");
const router = express.Router();
const mydata = require('../data/mydata.js');

function getCategories() {
    return mydata.categories.map(category => ({name:category.name}));
}

router.get('/', function (req, res) {
    res.render("home", {
        categories: getCategories()
    });
});

router.get("/getCategories", function(req, res) {
    res.json(getCategories());
});

router.get("/getProducts/:id([0-9]{1,10})", function(req, res, next) {
    let id = req.params.id;
    res.json(mydata.categories[id].products);
});

module.exports = router;


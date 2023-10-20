const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.render('cart.ejs');
});

router.post("/add/:id", function (req, res, next){
    let itemName = req.params.id;
    
    if (req.session.cart === undefined) {
        req.session.cart = {};
    } 

    if (req.session.cart[itemName]) {
        req.session.cart[itemName]++;
    } else {
        req.session.cart[itemName] = 1;
    }

    return res.sendStatus(204);
});

//router.post("/remove/:id([a-zA-Z0-9 %']{1,100})", function (req, res, next){
router.post("/remove/:id", function (req, res, next){
    let itemName = req.params.id;
    
    if (req.session.cart === undefined) {
        req.session.cart = {};
    } 

    if (req.session.cart[itemName]) {
        if (req.session.cart[itemName]>0) {
            req.session.cart[itemName]--;
            if (req.session.cart[itemName]==0) {
                delete req.session.cart[itemName];
            }
        }
    }

    return res.sendStatus(204);
});

router.get("/getAll", function (req, res, next) {
    if (req.session.cart === undefined) {
        req.session.cart = {}
    } 
    res.json(JSON.stringify(req.session.cart));
});

module.exports = router;
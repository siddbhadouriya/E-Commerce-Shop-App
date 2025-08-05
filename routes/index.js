const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");

const isLoggedin = require("../middlewares/isLoggedin");
const userModel = require("../models/user-model");

router.get("/", function (req,res){
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop", async (req, res) => {
    try {
        const products = await productModel.find();

        let success = req.flash("success")  // Fetch products from DB
        res.render("shop", { products,success });  // ✅ Pass products to EJS
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
router.get("/cart",isLoggedin , async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    const bill = Number(user.cart[0].price)+20 -Number(user.cart[0].discount);
    res.render("cart",{user, bill});
    


    
   
});
router.get("/addtocart/:productid",isLoggedin , async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
   
});
router.get("/logout", isLoggedin, function (req,res){
    res.redirect("/");
});

module.exports = router;
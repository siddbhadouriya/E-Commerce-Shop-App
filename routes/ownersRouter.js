const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.post("/create", async function(req, res) {
    try {
        //  Check env inside the route
        if (process.env.NODE_ENV !== "development") {
            return res.status(403).send("Production me allowed nahi hai");
        }

        const owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(503).send("Owner create karne ki permission nahi hai");
        }

        // Safe destructuring
        const { fullname, email, password } = req.body || {};

        if (!fullname || !email || !password) {
            return res.status(400).send("fullname, email, password chahiye");
        }

        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(201).send(createdOwner);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server Error");
    }
});



router.get("/admin", function(req, res){
    let success =  req.flash("success");
    res.render("createproducts", {success});
});


module.exports = router;

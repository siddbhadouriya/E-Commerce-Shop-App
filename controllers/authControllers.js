const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")


module.exports.registerUser = async function(req, res){
    try {
        const { fullname, email, password } = req.body || {};
        

        if (!fullname || !email || !password) {
            return res.status(400).send("fullname, email, and password are required");
        }

        let existingUser  = await userModel.findOne({email:email});
        if(existingUser) 
            return res.status(401).send("you already have an account, please login");


        // ✅ Hash password using async/await
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create user with hashed password
        let user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        });

        let token = generateToken(user);
        res.cookie("token", token);
        res.send("user created successfully");

       

    } catch (err) {
        console.log("Error:", err.message);
        res.status(500).send("Server Error");
    }
}


module.exports.loginUser = async function(req, res) {
    try {
        const { email, password } = req.body || {};

        // Validate input
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send("Email or password incorrect");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Email or password incorrect");
        }

        // Generate token
        const token = generateToken(user);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        // Send success response
        return res.redirect("/shop");

    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).send("Server Error");
    }
};



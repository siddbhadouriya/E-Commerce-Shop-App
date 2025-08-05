const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession  = require("express-session");
const flash = require("connect-flash");

const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const db = require("./config/mongoose-connection");
const indexRouter = require("./routes/index");


require("dotenv").config();




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET || "fallbackSecret123",
        resave: false,
        saveUninitialized: false,  // ✅ corrected spelling
        
    })
);


app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/", indexRouter); 
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);








app.get("/", (req, res) =>{
    res.send("hey");

});



app.listen(3000);

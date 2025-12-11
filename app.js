// importing files
const express=require("express");
const app=express();
const body_parser=require("body-parser");
const mongoose=require("mongoose");
const flash=require("connect-flash");
const passport=require("passport");
const local_strategy=require("passport-local");
const method_override=require("method-override");
const campground=require("./models/campgrounds");
const comment=require("./models/comments");
const user=require("./models/user");
const seedDB=require("./seedDB.js");
const { i18nMiddleware, ALL_LANGS } = require("./i18n");
require('dotenv').config();

// importing routes
const campground_routes=require("./routes/campgrounds.js");
const comment_routes=require("./routes/comments.js");
const auth_routes=require("./routes/auth.js");
const translate_routes=require("./routes/translate.js");
const admin_routes=require("./routes/admin.js");

// configuring app
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(method_override("_method"));
app.use(flash());

// configuring mongoose
const db_url = process.env.DB_URL || "mongodb://localhost/yelpcamp"
mongoose.set('strictQuery', false);
mongoose.connect(db_url);

// 确保数据库中存在三个固定营地 D5 / F3 / B1
async function ensureDefaultCampgrounds() {
    try {
        const zones = ["D5", "F3", "B1"];
        for (let i = 0; i < zones.length; i++) {
            const z = zones[i];
            const existing = await campground.findOne({ zone: z });
            if (!existing) {
                await campground.create({
                    name: z + " Camp",
                    image: "https://via.placeholder.com/800x400?text=" + z,
                    description: "Default camp for " + z,
                    zone: z,
                    price: "0"
                });
            }
        }
        console.log("Default D5/F3/B1 campgrounds ensured.");
    } catch (e) {
        console.log("Error ensuring default campgrounds:", e);
    }
}

mongoose.connection.once("open", () => {
    ensureDefaultCampgrounds();
});

// configuring passport 
app.use(require("express-session")({
    secret: process.env.SECRET || "bjhevbjfwheihifhwuoahouhuhoububljabjbvran.vn",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local_strategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.user=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    res.locals.request = req;
    next();
});

// 多语言中间件：根据 ?lang=xx 或 session.lang 设置当前语言
app.use(i18nMiddleware);

// 所有语言列表页面（“更多”）
app.get("/languages", function(req, res){
    const returnPath = req.query.return || "/";
    res.render("languages", {
        allLangs: ALL_LANGS,
        returnPath: returnPath
    });
});

// root route
app.get("/",function(req,res){
    res.render("home");
})

app.use(auth_routes);
app.use("/campgrounds", campground_routes);
app.use("/campgrounds/:id/comments", comment_routes);
app.use(translate_routes);
app.use(admin_routes);

const port=process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function(){
    console.log("The Yelpcamp server have started at port " +  port);
})

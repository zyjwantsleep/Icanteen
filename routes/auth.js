const express=require("express");
const router=express.Router({mergeParams: true});
const campground=require("../models/campgrounds")
const comment=require("../models/comments");
const user=require("../models/user");
const passport=require("passport");
const middleware=require("../middleware");

function getLang(req) {
    const q = (req.query.lang || req.session.lang || "zh");
    return q.toLowerCase();
}

// register-get route
router.get("/register", function(req,res){
    res.render("register");
});

// register-post route
router.post("/register", function(req,res){
    const lang = getLang(req);
    const { username, password } = req.body;
    // 管理员码：忽略大小写和前后空格
    const rawCode = req.body.adminCode || "";
    const normalizedCode = rawCode.trim().toUpperCase();

    // 如果填写了管理员码但不正确，直接提示错误，不创建账号
    if (normalizedCode && normalizedCode !== "ZYJ") {
        req.flash("error", "管理员注册码错误");
        return res.redirect("/register?lang=" + lang);
    }

    const temp=new user({
        username: username,
        role: normalizedCode === "ZYJ" ? "admin" : "user"
    });

    user.register(temp, password, function(error, user_created){
        if (error)
        {
            req.flash("error", error.message);
            console.log(error);
            return res.redirect("/register?lang=" + lang);
        }
        passport.authenticate("local")(req,res, function(){
            req.session.lang = lang;
            res.redirect("/campgrounds?lang=" + lang);
        })
    })
})

// login-get route
router.get("/login", function(req,res){
    res.render("login");
});

// login-post route：保持当前语言
router.post("/login", function(req, res, next) {
    const lang = getLang(req);
    passport.authenticate("local", function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.redirect("/login?lang=" + lang);
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.session.lang = lang;
            return res.redirect("/campgrounds?lang=" + lang);
        });
    })(req, res, next);
});

// logout route
router.get("/logout", function(req, res, next){
    const lang = getLang(req);
    req.logout(function(error) {
        if (error) {
            return next(error);
        }
        req.session.lang = lang;
        res.redirect('/campgrounds?lang=' + lang);
    });
})

module.exports=router;

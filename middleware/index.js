const campground=require("../models/campgrounds");
const comment=require("../models/comments");
const user=require("../models/user");

const middleware_obj={};

// 检查营地的权限（作者或管理员）
middleware_obj.check_campground_ownership = async function check_campground_ownership(req, res, next){
    if (req.isAuthenticated())
    {
        try {
            const campground_found = await campground.findById(req.params.id);
            if (!campground_found) {
                req.flash("error", "未找到对应营地");
                return res.redirect("/campgrounds");
            }
            // 如果没有作者信息（老数据），或者当前用户是作者，或者是管理员，都允许操作
            if (!campground_found.author || !campground_found.author.id ||
                campground_found.author.id.equals(req.user.id) ||
                req.user.role === "admin")
            {
                next();
            }
            else
            {
                req.flash("error", "你没有权限编辑该营地");
                res.redirect("back");
            }
        } catch (error) {
            console.log(error);
            req.flash("error", "未找到对应营地");
            res.redirect("/campgrounds");
        }
    }
    else
    {
        req.flash("error", "请先登录");
        res.redirect("back");
    }
}

// 检查评论的权限（作者或管理员）
middleware_obj.check_comment_ownership = async function check_comment_ownership(req, res, next)
{
    if (req.isAuthenticated())
    {
        try {
            const comment_found = await comment.findById(req.params.comment_id);
            if (!comment_found) {
                req.flash("error", "未找到对应评论");
                return res.redirect("back");
            }
            // 检查是否为作者或管理员
            if (comment_found.author.id.equals(req.user.id) || req.user.role === "admin")
            {
                next();
            }
            else
            {
                req.flash("error", "你没有权限编辑该评论");
                res.redirect("back");
            }
        } catch (error) {
            req.flash("error", "未找到对应评论");
            console.log(error);
            res.redirect("back");
        }
    }
    else
    {
        req.flash("error", "请先登录");
        res.redirect("back");
    }
}

// 检查是否登录
middleware_obj.isloggedin = function isloggedin (req,res,next){
    if (req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "请先登录");
    res.redirect("/login");
}

// 只允许管理员访问的中间件
middleware_obj.isAdmin = function isAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash("error", "请先登录");
        return res.redirect("/login");
    }
    if (!req.user || req.user.role !== "admin") {
        req.flash("error", "只有管理员可以访问该页面");
        return res.redirect("/campgrounds");
    }
    next();
}

module.exports= middleware_obj;

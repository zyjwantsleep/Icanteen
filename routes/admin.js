const express = require("express");
const router = express.Router();
const user = require("../models/user");
const middleware = require("../middleware");

// 管理员查看 / 搜索用户列表
router.get("/admin/users", middleware.isAdmin, async function (req, res) {
    try {
        const q = (req.query.q || "").trim();
        const filter = {};
        if (q) {
            filter.username = { $regex: q, $options: "i" };
        }
        const users = await user.find(filter).sort({ username: 1 }).exec();
        res.render("admin/users", {
            users: users,
            query: q
        });
    } catch (err) {
        console.log("Error loading users for admin:", err);
        req.flash("error", "加载用户列表失败");
        res.redirect("/campgrounds");
    }
});

// 管理员删除用户账号
router.post("/admin/users/:id/delete", middleware.isAdmin, async function (req, res) {
    try {
        const id = req.params.id;
        // 管理员不能删自己，避免误操作把唯一 admin 删掉
        if (req.user && req.user.id === id) {
            req.flash("error", "不能删除当前登录的管理员账号");
            return res.redirect("/admin/users");
        }
        await user.findByIdAndDelete(id);
        req.flash("success", "用户已删除");
        res.redirect("/admin/users");
    } catch (err) {
        console.log("Error deleting user by admin:", err);
        req.flash("error", "删除用户失败");
        res.redirect("/admin/users");
    }
});

module.exports = router;


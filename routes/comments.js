const express = require("express");
const router = express.Router({ mergeParams: true });
const campground = require("../models/campgrounds");
const comment = require("../models/comments");
const user = require("../models/user");
const middleware = require("../middleware");
const upload = require("../middleware/upload");

// comments-new route（顶层评价）
router.get("/new", middleware.isloggedin, async function (req, res) {
    try {
        const foundCampground = await campground.findById(req.params.id);
        console.log("campground searched successfully");
        res.render("comments/new", { campground: foundCampground, parentComment: null });
    } catch (error) {
        console.log("error encountered while searching campground:", error);
        req.flash("error", "未找到对应食堂");
        res.redirect("/campgrounds");
    }
});

// 回复某条评价的表单
router.get("/:comment_id/reply", middleware.isloggedin, async function (req, res) {
    try {
        const foundCampground = await campground.findById(req.params.id);
        const parentComment = await comment.findById(req.params.comment_id);
        if (!foundCampground || !parentComment) {
            req.flash("error", "未找到对应评价");
            return res.redirect("/campgrounds");
        }
        res.render("comments/new", { campground: foundCampground, parentComment: parentComment });
    } catch (error) {
        console.log("error encountered while searching comment for reply:", error);
        req.flash("error", "未找到对应评价");
        res.redirect("/campgrounds");
    }
});

// 新增评价（支持本地图片上传，最多 9 张）
router.post("/", middleware.isloggedin, upload.any(), async function (req, res) {
    try {
        const campground_found = await campground.findById(req.params.id);
        console.log("===============");

        const data = req.body.comment || {};
        const newCommentData = {
            text: data.text
        };

        // 收集本地上传的图片（最多 9 张）
        const uploadImages = Array.isArray(req.files) ? req.files : [];
        const images = uploadImages.map(file => "/uploads/" + file.filename).slice(0, 9);

        // 兼容旧参数：如果传入 image/image[] 则一并收集
        if (data.image) {
            const urlInputs = Array.isArray(data.image) ? data.image : [data.image];
            urlInputs.filter(Boolean).forEach(url => {
                if (images.length < 9) {
                    images.push(url);
                }
            });
        }

        if (images.length > 0) {
            newCommentData.images = images;
            // 兼容旧字段，保存首张图
            newCommentData.image = images[0];
        }

        if (data.parentId) {
            newCommentData.parentComment = data.parentId;
        }

        const comment_new = await comment.create(newCommentData);
        comment_new.author.id = req.user.id;
        comment_new.author.username = req.user.username;
        await comment_new.save();

        campground_found.comments.push(comment_new);
        await campground_found.save();

        req.flash("success", "评价已发布");
        res.redirect("/campgrounds/" + campground_found.id);
    } catch (error) {
        console.log(error);
        req.flash("error", "发表评论时出错，请稍后重试");
        res.redirect("/campgrounds");
    }
});

// 编辑评价
router.get("/:comment_id/edit", middleware.check_comment_ownership, async function (req, res) {
    try {
        const comment_found = await comment.findById(req.params.comment_id);
        res.render("comments/edit", { comment: comment_found, campground_id: req.params.id });
    } catch (error) {
        console.log(error);
        req.flash("error", "未找到对应评价");
        res.redirect("back");
    }
});

// 更新评价（目前只改文字）
router.put("/:comment_id", middleware.check_comment_ownership, async function (req, res) {
    try {
        await comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
        req.flash("success", "评价已更新");
        res.redirect("/campgrounds/" + req.params.id);
    } catch (error) {
        console.log(error);
        req.flash("error", "更新评价失败");
        res.redirect("back");
    }
});

// 管理员置顶 / 取消置顶评价
router.post("/:comment_id/pin", middleware.isloggedin, async function (req, res) {
    try {
        if (!req.user || req.user.role !== "admin") {
            req.flash("error", "只有管理员可以置顶评价");
            return res.redirect("back");
        }
        const comment_found = await comment.findById(req.params.comment_id);
        if (!comment_found) {
            req.flash("error", "未找到对应评价");
            return res.redirect("back");
        }
        comment_found.pinned = !comment_found.pinned;
        await comment_found.save();
        req.flash("success", comment_found.pinned ? "评价已置顶" : "已取消置顶");
        res.redirect("/campgrounds/" + req.params.id);
    } catch (error) {
        console.log(error);
        req.flash("error", "置顶评价失败");
        res.redirect("back");
    }
});

// 删除评价
router.delete("/:comment_id", middleware.check_comment_ownership, async function (req, res) {
    try {
        await comment.findByIdAndDelete(req.params.comment_id);
        // 同时从食堂的 comments 数组中移除这条评价的引用
        await campground.findByIdAndUpdate(req.params.id, {
            $pull: { comments: req.params.comment_id }
        });
        req.flash("success", "评价已删除");
        res.redirect("/campgrounds/" + req.params.id);
    } catch (error) {
        console.log(error);
        req.flash("error", "删除评价失败");
        res.redirect("back");
    }
});

module.exports = router;

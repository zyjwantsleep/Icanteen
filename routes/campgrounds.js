const express = require("express");
const router = express.Router({ mergeParams: true });
const campground = require("../models/campgrounds");
const comment = require("../models/comments");
const user = require("../models/user");
const middleware = require("../middleware");
const upload = require("../middleware/upload");

// 列表页：按区域展示所有食堂
router.get("/", async function (req, res) {
    try {
        const campgrounds = await campground.find({});
        console.log("search request was successfull");
        res.render("campgrounds/index", { campground: campgrounds });
    } catch (error) {
        console.log("we have encountered error");
        console.log(error);
        res.status(500).send("服务器错误");
    }
});

// 手动创建食堂（保留，正常流程用不到）
router.post("/", middleware.isloggedin, async function (req, res) {
    try {
        const temp = new campground({
            name: req.body.name,
            image: req.body.image_url,
            description: req.body.description,
            zone: req.body.zone,
            author: {
                id: req.user.id,
                username: req.user.username
            },
            price: req.body.price,
            lastEditor: {
                id: req.user.id,
                username: req.user.username
            }
        });
        await campground.create(temp);
        console.log("campground created");
        res.redirect("/campgrounds");
    } catch (error) {
        console.log("error encountered in creating new campground");
        console.log(error);
        res.status(500).send("服务器错误");
    }
});

// 选择食堂发布内容
router.get("/new", middleware.isloggedin, function (req, res) {
    res.render("campgrounds/new");
});

// 发布内容到指定食堂（D5/F3/B1）：本质是添加一条评价（支持本地图片上传，最多 9 张）
router.post("/publish", middleware.isloggedin, upload.any(), async function (req, res) {
    try {
        const zone = req.body.zone;
        const text = req.body.text;

        if (!zone || !text) {
            req.flash("error", "请选择食堂并填写内容！");
            return res.redirect("/campgrounds/new");
        }

        const campground_found = await campground.findOne({ zone: zone });
        if (!campground_found) {
            req.flash("error", "对应食堂不存在，请联系管理员");
            return res.redirect("/campgrounds");
        }

        const uploadImages = Array.isArray(req.files) ? req.files : [];
        const images = uploadImages.map(file => "/uploads/" + file.filename).slice(0, 9);

        const newCommentData = {
            text: text
        };

        if (images.length > 0) {
            newCommentData.images = images;
            newCommentData.image = images[0];
        }

        const comment_new = await comment.create(newCommentData);
        comment_new.author.id = req.user.id;
        comment_new.author.username = req.user.username;
        await comment_new.save();

        campground_found.comments.push(comment_new);
        await campground_found.save();

        req.flash("success", "发布成功");
        res.redirect("/campgrounds/" + campground_found.id);
    } catch (error) {
        console.log("error encountered while publishing content:", error);
        req.flash("error", "发布失败，请稍后再试");
        res.redirect("/campgrounds");
    }
});

// 详情页：评论按“置顶优先 + 时间”排序
router.get("/:id", middleware.isloggedin, async function (req, res) {
    try {
        // 默认：先按 pinned（true 在前），再按时间（最新在前）
        let sortOption = { pinned: -1, createdAt: -1 };
        const sort = req.query.sort;
        if (sort === "time_asc") {
            // 时间从旧到新，但置顶仍然在非置顶前面
            sortOption = { pinned: -1, createdAt: 1 };
        }

        const campground_found = await campground.findById(req.params.id)
            .populate({
                path: "comments",
                options: { sort: sortOption }
            })
            .exec();

        console.log("campground data found sucessfully");
        res.render("campgrounds/details", {
            campground: campground_found,
            sort: sort || "time_desc"
        });
    } catch (error) {
        console.log("error encountered while finding campground data");
        console.log(error);
        res.status(500).send("服务器错误");
    }
});

// 编辑食堂
router.get("/:id/edit", middleware.check_campground_ownership, async function (req, res) {
    try {
        const campground_found = await campground.findById(req.params.id);
        res.render("campgrounds/edit", { campground: campground_found });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

// 更新食堂（支持更换封面图片，本地上传）
router.put("/:id", middleware.check_campground_ownership, upload.single("image_file"), async function (req, res) {
    try {
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            zone: req.body.zone,
            price: req.body.price,
            lastEditor: {
                id: req.user.id,
                username: req.user.username
            }
        };
        // 如果上传了新图片，则覆盖原有封面
        if (req.file) {
            updateData.image = "/uploads/" + req.file.filename;
        } else if (req.body.image_url) {
            // 兼容：如果仍然传入了图片 URL，则使用 URL
            updateData.image = req.body.image_url;
        }

        await campground.findByIdAndUpdate(req.params.id, updateData);
        res.redirect(req.params.id);
    } catch (error) {
        console.log(error);
        res.redirect(req.params.id + "/edit");
    }
});

// 删除食堂：顺带删除其下所有评价
router.delete("/:id", middleware.check_campground_ownership, async function (req, res) {
    try {
        const campground_found = await campground.findById(req.params.id);
        if (campground_found) {
            await comment.deleteMany({ _id: { $in: campground_found.comments } });
            await campground.deleteOne({ _id: req.params.id });
        }
        req.flash("success", "食堂已删除");
        res.redirect("/campgrounds");
    } catch (error) {
        console.log(error);
        res.redirect("/campgrounds");
    }
});

module.exports = router;

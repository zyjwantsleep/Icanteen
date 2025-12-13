const mongoose=require("mongoose");
const comments_schema=new mongoose.Schema({
    // 评论文字内容
    text: String,
    // 评论图片（最多 9 张）
    images: [String],
    // 兼容旧数据的单图字段
    image: String,
    // 可选父评论，用于实现“回复某条评论”
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        default: null
    },
    // 是否置顶（仅管理员可修改）
    pinned: {
        type: Boolean,
        default: false
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
}, {
    // 自动维护创建时间和更新时间，便于排序展示
    timestamps: true
});

module.exports=mongoose.model("comments", comments_schema);

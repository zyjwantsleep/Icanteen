const mongoose=require("mongoose");
var campground_schema=new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    // 位置/类型：D5 / F3 / B1（三种之一，如果老数据没有也允许）
    zone: {
        type: String,
        enum: ["D5", "F3", "B1"]
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    price: String,
    // 最近一次编辑者
    lastEditor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});

module.exports = mongoose.model("campground",campground_schema);

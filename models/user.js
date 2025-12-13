const mongoose=require("mongoose");
const passport_local_mongoose=require("passport-local-mongoose");
let user_schema=new mongoose.Schema({
    username: String,
    password: String,
    // 用户角色：普通用户 user / 管理员 admin
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

user_schema.plugin(passport_local_mongoose);
module.exports=mongoose.model("user", user_schema);

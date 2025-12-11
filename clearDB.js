const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");

// 使用与 app.js 相同的连接字符串
const db_url = process.env.DB_URL || "mongodb://localhost/yelpcamp";
mongoose.set("strictQuery", false);
mongoose.connect(db_url);

async function clear() {
  try {
    await Campground.deleteMany({});
    await Comment.deleteMany({});
    console.log("Campgrounds and comments cleared.");
  } catch (e) {
    console.error("Error while clearing DB:", e);
  } finally {
    mongoose.connection.close();
  }
}

clear();


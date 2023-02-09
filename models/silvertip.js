const mongoose = require("mongoose");

const TipsSchema = new mongoose.Schema({
  date: { type: String },
  tips: [],
});

const tipsModel = mongoose.model("silvertips", TipsSchema);
module.exports = tipsModel;

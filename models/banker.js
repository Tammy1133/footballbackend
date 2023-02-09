const mongoose = require("mongoose");

const BankerSchema = new mongoose.Schema({
  date: { type: String },
  tips: [],
});

const tipsModel = mongoose.model("bankertips", BankerSchema);
module.exports = tipsModel;

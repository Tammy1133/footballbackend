const mongoose = require("mongoose");

const BronzeSchema = new mongoose.Schema({
  date: { type: String },
  tips: [],
});

const tipsModel = mongoose.model("bronzetips", BronzeSchema);
module.exports = tipsModel;

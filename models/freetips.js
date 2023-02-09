const mongoose = require("mongoose");

const freeTipsSchema = new mongoose.Schema({
  date: { type: String },
  tips: [],
});

const freetipsModel = mongoose.model("myFreeTip", freeTipsSchema);
module.exports = freetipsModel;

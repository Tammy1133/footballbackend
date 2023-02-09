const { default: mongoose } = require("mongoose");

const paymentSchema = mongoose.Schema({
  image: { type: String },
  email: { type: String },
  name: { type: String },
});

const paymentModel = mongoose.model("payments", paymentSchema);

module.exports = paymentModel;

const paymentRoute = require("../models/payment");

const router = require("express").Router();

router.post("/pay", async (req, res) => {
  const { image, email, name } = req.body;

  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
    email.includes(".com")
  ) {
    if (image.split("").length > 0) {
      if (name.split(" ").length > 1 && name.match(/^[A-Z a-z]+$/)) {
        try {
          const newPayment = await new paymentRoute({ image, email, name });

          res.status(200).send("Successful");
          newPayment.save();
        } catch (error) {
          res.status(405).send(error);
        }
      } else {
        res.status(406).send("Invalid name");
      }
    } else {
      res.status(406).send("Image not valid");
    }
  } else {
    res.status(406).send("Email not valid");
  }
});

router.get("/payments", async (req, res) => {
  try {
    const payments = await paymentRoute.find({});
    res.status(200).send(payments);
  } catch (error) {
    res.status(405).send(error);
  }
});
router.delete("/deletepayment/:id", async (req, res) => {
  try {
    const payments = await paymentRoute.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(405).send(error);
  }
});

module.exports = router;

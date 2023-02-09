const freeTipsModel = require("../models/freetips");
const freetipsModel = require("../models/freetips");
const BronzeTipsModel = require("../models/bronzetip");
const SilverTipsModel = require("../models/silvertip");
const GoldTipsModel = require("../models/goldtip");
const BankerTipsModel = require("../models/banker");

const router = require("express").Router();

router.post("/free", async (req, res) => {
  const { date, tips } = req.body;
  try {
    const dateEntered = await freeTipsModel.findOne({ date: date });

    if (dateEntered) {
      const updateTips = await freeTipsModel.findOneAndUpdate(
        { date: req.body.date },
        { tips: [...dateEntered.tips, req.body.tips] }
      );
      res.send(updateTips);
    } else {
      const newTip = await new freeTipsModel({ date, tips: [tips] });
      res.status(200).send(newTip);
      newTip.save();
    }
    // if (!dateEntered) {
    // /
    // } else {

    // }
  } catch (error) {
    res.status(403).send("Error");
  }
});
router.post("/banker", async (req, res) => {
  const { date, tips } = req.body;
  try {
    const dateEntered = await BankerTipsModel.findOne({ date: date });

    if (dateEntered) {
      const updateTips = await BankerTipsModel.findOneAndUpdate(
        { date: req.body.date },
        { tips: [...dateEntered.tips, req.body.tips] }
      );
      res.status(200).send(updateTips);
    } else {
      const newTip = await new BankerTipsModel({ date, tips: [tips] });
      res.status(200).send(newTip);
      newTip.save();
    }
    // if (!dateEntered) {
    // /
    // } else {

    // }
  } catch (error) {
    res.status(403).send("Error");
  }
});

router.post("/bronze", async (req, res) => {
  const { date, tips } = req.body;
  try {
    const dateEntered = await BronzeTipsModel.findOne({ date: date });

    if (dateEntered) {
      const updateTips = await BronzeTipsModel.findOneAndUpdate(
        { date: req.body.date },
        { tips: [...dateEntered.tips, req.body.tips] }
      );
      res.status(200).send(updateTips);
    } else {
      const newTip = await new BronzeTipsModel({ date, tips: [tips] });
      res.status(200).send(newTip);
      newTip.save();
    }
    // if (!dateEntered) {
    // /
    // } else {

    // }
  } catch (error) {
    res.status(403).send("Error");
  }
});
router.post("/silver", async (req, res) => {
  const { date, tips } = req.body;
  try {
    const dateEntered = await SilverTipsModel.findOne({ date: date });

    if (dateEntered) {
      const updateTips = await SilverTipsModel.findOneAndUpdate(
        { date: req.body.date },
        { tips: [...dateEntered.tips, req.body.tips] }
      );
      res.status(200).send(updateTips);
    } else {
      const newTip = await new SilverTipsModel({ date, tips: [tips] });
      res.status(200).send(newTip);
      newTip.save();
    }
    // if (!dateEntered) {
    // /
    // } else {

    // }
  } catch (error) {
    res.status(403).send("Error");
  }
});
router.post("/gold", async (req, res) => {
  const { date, tips } = req.body;
  try {
    const dateEntered = await GoldTipsModel.findOne({ date: date });

    if (dateEntered) {
      const updateTips = await GoldTipsModel.findOneAndUpdate(
        { date: req.body.date },
        { tips: [...dateEntered.tips, req.body.tips] }
      );
      res.status(200).send(updateTips);
    } else {
      const newTip = await new GoldTipsModel({ date, tips: [tips] });
      res.status(200).send(newTip);
      newTip.save();
    }
    // if (!dateEntered) {
    // /
    // } else {

    // }
  } catch (error) {
    res.status(403).send("Error");
  }
});

router.get("/getfreetips", async (req, res) => {
  try {
    const freetips = await freetipsModel.find({});
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.get("/getbankertips", async (req, res) => {
  try {
    const freetips = await BankerTipsModel.find({});
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.get("/getbronzetips", async (req, res) => {
  try {
    const freetips = await BronzeTipsModel.find({});
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.get("/getsilvertips", async (req, res) => {
  try {
    const freetips = await SilverTipsModel.find({});
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.get("/getgoldtips", async (req, res) => {
  try {
    const freetips = await GoldTipsModel.find({});
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.post("/geteachfreetip", async (req, res) => {
  try {
    const freetips = await freetipsModel.findOne({ date: req.body.date });
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.post("/geteachbankertip", async (req, res) => {
  try {
    const freetips = await BankerTipsModel.findOne({ date: req.body.date });
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.post("/geteachbronzetip", async (req, res) => {
  try {
    const freetips = await BronzeTipsModel.findOne({ date: req.body.date });
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.post("/geteachsilvertip", async (req, res) => {
  try {
    const freetips = await SilverTipsModel.findOne({ date: req.body.date });
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.post("/geteachgoldtip", async (req, res) => {
  try {
    const freetips = await GoldTipsModel.findOne({ date: req.body.date });
    res.status(200).send(freetips);
  } catch (error) {
    res.status(403).send(error);
  }
});
router.delete("/deletefreetip/:id", async (req, res) => {
  try {
    const freetips = await freeTipsModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(405).send(error);
  }
});
router.delete("/deletebankertip/:id", async (req, res) => {
  try {
    const freetips = await BankerTipsModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(405).send(error);
  }
});
router.delete("/deletebronzetip/:id", async (req, res) => {
  try {
    const freetips = await BronzeTipsModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(405).send(error);
  }
});
router.delete("/deletesilvertip/:id", async (req, res) => {
  try {
    const freetips = await SilverTipsModel.findOneAndRemove(req.params.id);
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(405).send(error);
  }
});
router.delete("/deletegoldtip/:id", async (req, res) => {
  try {
    const freetips = await GoldTipsModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(405).send(error);
  }
});

router.delete("/deleteeachfreetip/:fixture", async (req, res) => {
  try {
    const freetips = await freeTipsModel.updateMany(
      {},
      {
        $pull: { tips: { fixture: req.params.fixture + " " } },
      }
    );

    res.status(200).send(req.params.fixture);
  } catch (error) {
    res.status(401).send(error);
  }
});
router.delete("/deleteeachbankertip/:fixture", async (req, res) => {
  try {
    const freetips = await BankerTipsModel.updateMany(
      {},
      {
        $pull: { tips: { fixture: req.params.fixture + " " } },
      }
    );

    res.status(200).send(req.params.fixture);
  } catch (error) {
    res.status(401).send(error);
  }
});
router.delete("/deleteeachgoldtip/:fixture", async (req, res) => {
  try {
    const freetips = await GoldTipsModel.updateMany(
      {},
      {
        $pull: { tips: { fixture: req.params.fixture + " " } },
      }
    );

    res.status(200).send(req.params.fixture);
  } catch (error) {
    res.status(401).send(error);
  }
});
router.delete("/deleteeachsilvertip/:fixture", async (req, res) => {
  try {
    const freetips = await SilverTipsModel.updateMany(
      {},
      {
        $pull: { tips: { fixture: req.params.fixture + " " } },
      }
    );

    res.status(200).send(req.params.fixture);
  } catch (error) {
    res.status(401).send(error);
  }
});
router.delete("/deleteeachbronzetip/:fixture", async (req, res) => {
  try {
    const freetips = await BronzeTipsModel.updateMany(
      {},
      {
        $pull: { tips: { fixture: req.params.fixture + " " } },
      }
    );

    res.status(200).send(req.params.fixture);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;

const User = require("../models/newitem.model");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authentication");
const authorise = require("../middleware/authorise");
router.post(
  "/",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const user = req.user;
      console.log(req.body);
      const newitem = await User.create({
        title: req.body.title,
        body: req.body.body,
        user: user.user._id,
      });
      return res.status(201).json({ newitem });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const newitem = await User.find().lean().exec();
    return res.status(201).send(newitem);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const newitem = await User.findById(req.params.id).lean().exec();
    return res.status(201).send(newitem);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const newitem = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send(newitem);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const newitem = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send(newitem);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
module.exports = router;

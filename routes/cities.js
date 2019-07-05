const asyncMiddleware = require("../middleware/async");
const validateObjectId = require("../middleware/validateObjectId");
const { City, validateCity } = require("../models/city");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //throw new Error('Could not get the cities.');
  const cities = await City.find().sort("name");
  res.send({
    status: true,
    message: "Cities",
    ONLINE_RADIO: cities
  });
});

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validateCity(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let city = new City({
      name: req.body.name
    });
    city = await city.save();

    res.send(city);
  })
);

router.put("/:id", async (req, res) => {
  const { error } = validateCity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const city = await City.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name }
    },
    { new: true }
  );

  if (!city)
    return res.status(404).send("The city with the given ID was not found.");

  res.send(city);
});

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const city = await City.findByIdAndRemove(req.params.id);

    if (!city)
      return res.status(404).send("The city with the given ID was not found.");

    res.send(city);
  })
);

router.get("/:id", validateObjectId, async (req, res) => {
  const city = await City.findById(req.params.id);

  if (!city)
    return res.status(404).send("The city with the given ID was not found.");

  res.send(city);
});

module.exports = router;

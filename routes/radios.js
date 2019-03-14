const express = require('express');
const upload = require('../middleware/fileUploader');
const { Radio, validateRadio } = require('../models/radio');

const router = express.Router();

router.get('/', async (req, res) => {
  const radios = await Radio.find().sort('name');
  res.send({
      success: true,
      ONLINE_RADIO: radios
    });
});

router.post('/', upload.single('image'), async (req, res) => {

  const { error } = validateRadio(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  if (!req.file) return res.status(400).send("Please upload a jpeg or png file");
  const radio = new Radio({
      name: req.body.name,
      url: req.body.url,
      frequency: req.body.frequency,
      image: req.file.path,
      description: req.body.description
  });
  await radio.save();

  res.send(radio);
});

router.put('/:id', upload.single('image'), async (req, res) => {
    const { error } = validateRadio(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    if (!req.file) return res.status(400).send("Please upload a jpeg or png file");
  
    const radio = await Radio.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        url: req.body.url,
        frequency: req.body.frequency,
        image: req.file.path,
        description: req.body.description
      }, { new: true });
  
    if (!radio) return res.status(404).send('The radio with the given ID was not found.');
    
    res.send(radio);
  });
  
  router.delete('/:id', async (req, res) => {
    const radio = await Radio.findByIdAndRemove(req.params.id);
  
    if (!radio) return res.status(404).send('The radio with the given ID was not found.');
  
    res.send(radio);
  });
  
  router.get('/:id', async (req, res) => {
    const radio = await Radio.findById(req.params.id);
  
    if (!radio) return res.status(404).send('The radio with the given ID was not found.');
  
    res.send(radio);
  });
  
  module.exports = router;
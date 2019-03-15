const express = require('express');
const upload = require('../middleware/fileUploader');
const { Radio, validateRadio } = require('../models/radio');
const { City } = require('../models/city');

const router = express.Router();

router.get('/', async (req, res) => {
  const radios = await Radio.find().select('-description -_id').sort('name');
  res.send({
      success: true,
      ONLINE_RADIO: radios
    });
});

router.get('/featured', async (req, res) => {
  const radios = await Radio.find({ isFeatured: 1 }).select('-description -_id').sort('name');
  res.send({
      success: true,
      ONLINE_RADIO: radios
    });
});

router.post('/', upload.single('image'), async (req, res) => {

  const { error } = validateRadio(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const city = await City.findById(req.body.cityId);
  if (!city) return res.status(400).send('Invalid radio city');

  if (!req.file) return res.status(400).send("Please upload a jpeg or png file");

  const radio = new Radio({
      name: req.body.name,
      city: {
          _id: city._id,
          name: city.name
      },
      url: req.body.url,
      frequency: req.body.frequency,
      image: req.file.path,
      description: req.body.description,
      isFeatured: req.body.isFeatured
  });
  await radio.save();

  res.send(radio);
});

router.put('/:id', upload.single('image'), async (req, res) => {
    const { error } = validateRadio(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const city = await City.findById(req.body.cityId);
    if (!city) return res.status(400).send('Invalid radio city.');
    
    if (!req.file) return res.status(400).send("Please upload a jpeg or png file");
  
    const radio = await Radio.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        city: {
            _id: city._id,
            name: city.name
        },
        url: req.body.url,
        frequency: req.body.frequency,
        image: req.file.path,
        description: req.body.description,
        isFeatured: req.body.isFeatured
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
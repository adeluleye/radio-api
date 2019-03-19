const express = require('express');
const { Theme, validateTheme } = require('../models/theme');

const router = express.Router();

router.get('/', async (req, res) => {
  const themes = await Theme.find().sort('name');
  res.send({
    success: true,
    message: 'Themes',
    ONLINE_RADIO: themes
  });
});

router.post('/', async (req, res) => {

  const { error } = validateTheme(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const theme = new Theme({
      name: req.body.name,
      color1: req.body.color1,
      color2: req.body.color2
  });
  await theme.save();

  res.send(theme);
});

router.put('/:id', async (req, res) => {
    const { error } = validateTheme(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const theme = await Theme.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        color1: req.body.color1,
        color2: req.body.color2
      }, { new: true });
  
    if (!theme) return res.status(404).send('The theme with the given ID was not found.');
    
    res.send(theme);
  });
  
  router.delete('/:id', async (req, res) => {
    const theme = await Theme.findByIdAndRemove(req.params.id);
  
    if (!theme) return res.status(404).send('The theme with the given ID was not found.');
  
    res.send(theme);
  });
  
  router.get('/:id', async (req, res) => {
    const theme = await Theme.findById(req.params.id);
  
    if (!theme) return res.status(404).send('The theme with the given ID was not found.');
  
    res.send(theme);
  });
  
  module.exports = router;
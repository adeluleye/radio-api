const express = require('express');
const upload = require('../middleware/fileUploader');
const { Setting, validateSetting } = require('../models/setting');

const router = express.Router();

router.get('/', async (req, res) => {
  const settings = await Setting.find().sort('name');
  res.send({
      ONLINE_RADIO: settings
    });
});

router.post('/', upload.single('app_logo'), async (req, res) => {

  const { error } = validateSetting(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.file) return res.status(400).send("Please upload a jpeg or png file");

  const setting = new Setting({
      app_name: req.body.app_name,
      app_logo: req.file.path,
      app_fb_url: req.body.app_fb_url,
      app_twitter_url: req.body.app_twitter_url,
      app_version: req.body.app_version,
      app_author: req.body.app_author,
      app_contact: req.body.app_contact,
      app_email: req.body.app_email,
      app_website_url: req.body.app_website_url,
      app_description: req.body.app_description,
      app_developed_by: req.body.app_developed_by,
      app_privacy_policy: req.body.app_privacy_policy
  });
  await setting.save();

  res.send(setting);
});

router.put('/:id', upload.single('app_logo'), async (req, res) => {
    const { error } = validateSetting(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    if (!req.file) return res.status(400).send("Please upload a jpeg or png file");
  
    const setting = await Setting.findByIdAndUpdate(req.params.id,
      { 
        app_name: req.body.app_name,
        app_logo: req.file.path,
        app_fb_url: req.body.app_fb_url,
        app_twitter_url: req.body.app_twitter_url,
        app_version: req.body.app_version,
        app_author: req.body.app_author,
        app_contact: req.body.app_contact,
        app_email: req.body.app_email,
        app_website_url: req.body.app_website_url,
        app_description: req.body.app_description,
        app_developed_by: req.body.app_developed_by,
        app_privacy_policy: req.body.app_privacy_policy
      }, { new: true });
  
    if (!setting) return res.status(404).send('The application setting with the given ID was not found.');
    
    res.send(setting);
  });
  
  router.delete('/:id', async (req, res) => {
    const setting = await Setting.findByIdAndRemove(req.params.id);
  
    if (!setting) return res.status(404).send('The app setting with the given ID was not found.');
  
    res.send(setting);
  });
  
  router.get('/:id', async (req, res) => {
    const setting = await Setting.findById(req.params.id);
  
    if (!setting) return res.status(404).send('The app setting with the given ID was not found.');
  
    res.send(setting);
  });
  
  module.exports = router;
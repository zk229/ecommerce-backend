const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: { model: Product }
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// GET one tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product }
    });
    if(!tagData) {
      res.status(404).json({ message: "No tag with this id found!" });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);
    if(!tagData) {
      res.status(404).json({ message: "No tag with this id found!" });
      return;
    }
    tagData.tag_name = req.body.tag_name;
    await tagData.save();
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!tagData) {
      res.status(404).json({ message: "No tag with this id found!" });
      return;
    }

    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.query("SELECT itemId, itemName, itemPrice, categoryDescription FROM item, category WHERE category.categoryId = item.itemCategoryId;")
    .then(([rows]) => res.send(rows))
    .catch(e => {
      console.log("" + e);
      res.status(500).send();
    });
});

module.exports = router;
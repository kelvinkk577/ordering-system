const express = require('express');
const router = express.Router();

async function postOrder(req, res) {
  const con = req.db;
  try {
    await con.query("START TRANSACTION");
    const [results] = await con.query("INSERT INTO oos.order () values ()");
    const orderId = results.insertId;

    await con.query("INSERT INTO oos.customer (customerPhone, customerEmail, order_orderId) VALUES (?, ?, ?)", [req.body.customerPhone, req.body.customerEmail, orderId])
    for (item of req.body.orderItems) {
      await con.query("INSERT INTO oos.orderitem (orderItemAmount, item_itemId, order_orderId) VALUES (?, ?, ?)", [item.orderItemAmount, item.itemId, orderId]);
      console.log("inserted order item");
    }

    await con.query("COMMIT");
    res.send("Committed");
  } catch (err) {
    await con.query("ROLLBACK");
    console.log("" + err);
    console.log("Rollbacked");
    res.status(500).send();
  }

}

router.post('/', (req, res) => {
  console.log(req.body);
  postOrder(req, res);
});


module.exports = router;
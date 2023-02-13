require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mysql = require('mysql2/promise');

const menu = require('./routes/menu');
const order = require('./routes/order');

async function start() {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: process.env.DATABASE_SECRET,
    database: "oos"
  });

  await con.connect();
  console.log("connected to database");

  const app = express();
  const port = 3001;

  app.use(express.json());
  app.use(cors());

  app.use((req, res, next) => {
    req.db = con;
    next();
  })

  app.use('/api/images', express.static('images'));
  app.use('/api/menu', menu);
  app.use('/api/order', order);

  // Unfinished, test SSE
  // const emitSSE = (res, id, data) => {
  //   // console.log(data);
  //   res.write('id: ' + id + '\n');
  //   res.write("data: " + data + '\n\n');
  // }

  // const handleSSE = async (req, res) => {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/event-stream',
  //     'Cache-Control': 'no-cache',
  //     'Connection': 'keep-alive'
  //   });

  //   const id = (new Date()).toLocaleTimeString();
  //   // Sends a SSE every 3 seconds on a single connection.
  //   setInterval(async function() {
  //     const [rows] = await con.query("SELECT orderitem.order_orderId, customerPhone, itemName, orderItemAmount FROM item, orderitem, customer WHERE item_itemId = itemId AND orderitem.order_orderId = customer.order_orderId");
  //     emitSSE(res, id, JSON.stringify(rows));
  //   }, 3000);
  
  //   const [rows] = await con.query("SELECT orderitem.order_orderId, customerPhone, itemName, orderItemAmount FROM item, orderitem, customer WHERE item_itemId = itemId AND orderitem.order_orderId = customer.order_orderId");
  //   emitSSE(res, id, JSON.stringify(rows));
  // }
  
  // app.get('/api/orders', handleSSE);
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
  });
}

start();
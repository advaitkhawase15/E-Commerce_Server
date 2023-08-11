const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.NODE_PORT;
const express = require("express");
const app = express();
const checkout = require('./routes/checkout');
const product = require('./routes/products');
const feedback = require('./routes/feedback');
const product_detail = require('./routes/product_detail');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors())

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.use('/send', checkout);
app.use('/products', product);
app.use('/feedback', feedback);
app.use('/product_detail', product_detail)


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
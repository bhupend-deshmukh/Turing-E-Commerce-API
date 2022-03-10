const express = require("express");
const app = express();

const department = require("./routes/departments")
const categories = require("./routes/categories")
const attributes = require("./routes/attributes")
const product = require("./routes/products")
const orders = require("./routes/orders")
const customer = require('./routes/customer')
const shoppingcart = require("./routes/shoppingcart")
const tax = require("./routes/tax")
const shipping = require("./routes/shipping")


app.use(express.json())
app.use("/",department)
app.use("/",categories)
app.use("/",attributes)
app.use("/",product)
app.use("/",orders)
app.use("/",customer)
app.use("/",shoppingcart)
app.use("/",tax)
app.use("/",shipping)


const PORT = 5550;

app.listen(PORT, (req, res) => {
  console.log(`Your server is listening on http://localhost:${PORT}`);
});
const express = require("express");
const app = express();
const cors = require("cors");
const port = 6001
const mongoose = require("mongoose");
const jwt=require('jsonwebtoken');
const jwtpass='kittu';
const stripe=require("stripe")('sk_test_51OxXRKSCCkZ2sa3Syrj5KJ4lKWdcWn1hhq0chvDldaRxuZ855sM4ggE84GSiDN69vClLG4fJg0uzt6aJn4XZX2WV00LASFYtB3');

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://vanshikas2022:vanshika10@restro-cluster.jwm1uhr.mongodb.net/Restro?retryWrites=true&w=majority&appName=Restro-cluster"
  )
  .then(console.log("connected successfully!"))
  .catch((error) => console.log("error connecting", error));

const menuRoutes=require('./api/routes/menuRoutes');
const cartRoutes=require('./api/routes/cartRoutes');
const userRoutes=require('./api/routes/userRoutes');
const paymentRoutes=require('./api/routes/paymentRoutes');

app.use('/menu',menuRoutes)
app.use('/carts',cartRoutes)
app.use('/users',userRoutes)
app.use('/payments',paymentRoutes)

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price*100; 
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    description: 'Software development services',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

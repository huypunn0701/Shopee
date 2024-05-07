require("dotenv").config();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);
const YOUR_DOMAIN = "http://localhost:5173";

const paymentRouter = (app) => {
  app.post("/payment", async (req, res) => {
    const { amount, email } = req.body;
    console.log(req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "vnd",
              product_data: {
                name: "Tổng tiền thanh toán",
              },
              unit_amount: amount, // Bỏ phần nhân với 100 đi
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: email,
        success_url: `${YOUR_DOMAIN}`,
        cancel_url: `${YOUR_DOMAIN}/?success=false`,
      });
      res.json({ status: "success", url: session.url });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", cancelUrl: `${YOUR_DOMAIN}/cancel.html` });
    }
  });
};

module.exports = { paymentRouter };

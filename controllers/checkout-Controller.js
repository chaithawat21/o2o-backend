require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:5173/cart';
module.exports.checkout = async (req, res) => {
    console.log(req.body.totalAmount)
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'promptpay'],
        line_items: [
          {
            price_data: {
              currency: 'thb', 
              product_data: {
                name: 'Product Name', 
              },
              unit_amount: req.body.totalAmount * 100, 
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:5173/success/?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
      res.json({ url: session.url, status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    // console.log('test')
  }
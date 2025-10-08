import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    const { plan, user } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan.price * 100, // Convert ₹ to paise
      currency: "inr",
      description: `${plan.name} Plan for ${user.name}`,
      receipt_email: user.email,
      metadata: {
        user_name: user.name,
        phone: user.phone,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default router;

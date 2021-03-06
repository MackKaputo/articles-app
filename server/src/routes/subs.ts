import express from "express"
import User from "../models/user"
import Article from "../models/article"
import { checkAuth } from "../middleware/checkAuth"
import { stripe } from "../utils/stripe"

const router = express.Router()

router.get("/prices", checkAuth, async (req, res) => {
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY
    })
    console.log("requesting for prices")
    return res.json(prices)
})


router.post("/session", checkAuth, async (req, res) => {
    const user = await User.findOne({email: req.user})

    // console.log("User found, creating session")
    // console.log("PRICE ID IS  ", req.body.priceId)
    const session = await stripe.checkout.sessions.create(
        {
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: req.body.priceId,
                    quantity: 1
                }
            ],
            success_url: "http://localhost:3000/articles",
            cancel_url: "http://localhost:3000/article-plans", //failure url
            customer: user.customerStripeId
        },

        {
            apiKey: process.env.STRIPE_SECRET_KEY
        }
    )
    console.log("session: ", session)

    return res.json(session)
})



export default router
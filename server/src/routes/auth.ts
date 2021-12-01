import express from "express"
import { body, validationResult } from "express-validator"

const router = express.Router()


router.post(
    '/signup',
    body("email").isEmail().withMessage("The email is invalid"),
    body("password").isLength({min: 5}).withMessage("The password's length should be at least 5 characters"),
    async (req, res) => {

        const validationErrors = validationResult(req)

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(error => {
                return {
                    message: error.msg
                }
            })

            return res.json({errors})
        }

        const { email, password } = req.body

        
    res.json({email, password})
})


export default router
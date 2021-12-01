import express from "express"
import { body, validationResult } from "express-validator"
import User from "../models/user"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const router = express.Router()


router.post(
    '/signup',
    body("email")
        .isEmail().withMessage("The email is invalid"),
    body("password")
        .isString().withMessage("Password should be a string")
        .isLength({min: 5}).withMessage("The password's length should be at least 5 characters"),
    async (req, res) => {

        try {

            const validationErrors = validationResult(req)

            if(!validationErrors.isEmpty()) {
                const errors = validationErrors.array().map(error => {
                    return {
                        msg: error.msg
                    }
                })
    
                return res.json({errors})
            }
    
            const { email, password } = req.body
    
            const user = await User.findOne({email})
    
            if(user) {
                return res.json({
                    errors: [
                        {
                            msg: "Email already in use"
                        }
                    ],
                    data: null
                })
            }
    
            const hashedPassword = await bcrypt.hash(password, 10)
            // console.log({hashedPassword})
            const newUser = await User.create({
                email,
                password: hashedPassword
            })

            const token = await JWT.sign(
                {email: newUser.email},  //payload
                process.env.JWT_SECRET as string,
                {
                    expiresIn: 360000
                }
            )
    
            res.json({
                errors: [],
                data: {
                    token,
                    user: {
                        id: newUser._id,
                        email: newUser.email
                    }
                }
            })

        } catch (error) {
            console.log(error)
            return res.json({
                errors: [
                    {
                        msg: "Something went wrong on the server"
                    }
                ],
                data: null
            })
        }

    }
)

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(!user) {
        return res.json({
            errors: [
                {
                    msg: "Invalid credentials"
                }
            ],
            data: null
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.json({
            errors: [
                {
                    msg: "Invalid credentials"
                }
            ],
            data: null
        })
    }

    const token = await JWT.sign(
        {email: user.email},  //payload
        process.env.JWT_SECRET as string,
        {
            expiresIn: 360000
        }
    )

    res.json({
        errors: [],
        data: {
            token,
            user: {
                id: user._id,
                email: user.email
            }
        }
    })
})


export default router
const express = require('express');
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware/index");

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string().min(6)
})

router.post("/signup", async (req, res) => {
    try{
        const body = req.body;
        const {success} = signupBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message: "Validation error at signup"
            })
        }

        const user = await User.findOne({
            username: body.username
        })

        if(user?._id){
            return res.status(411).json({
                message: "Email already exists"
            })
        }

        const dbuser = await User.create({
            username: body.username,
            password: body.password,
            firstname: body.firstname,
            lastname: body.lastname,
        });

        if (dbuser) {
            const token = jwt.sign({
                userId: dbuser._id
            }, JWT_SECRET);
    
            res.json({
                message: "Sign up successful",
                token: "Bearer " + token
            })
            return;
        }
    }
    catch(error){
        console.log("signup route", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
    
})

router.post("/signin", async (req, res) => {
    try{
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Validation error at signin"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
    
            res.json({
                message: "Sign in successful",
                token: "Bearer " + token
            })
            return;
        }

        res.status(411).json({
            message: "invalid username or password"
        })
    }
    catch(error){
        console.log("signin route", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
    
})








module.exports = router;
import { NextFunction, Request, Response } from "express";
import pool from "../db/connection.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createToken } from "../utils/tokenGenrator.js";
import { COOKIE_NAME } from "../utils/constant.js";

const userSchema = z.object({
    name: z.string().min(2, "Name is Required"),
    email: z.string().email("Invalid email Format"),
    password: z.string().min(6, "Password must contain at least 6 characters")
});
const LoginSchema = z.object({
    email: z.string().email("Invalid email Format"),
    password: z.string().min(6, "Password must contain at least 6 characters")
});

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        const users = result.rows; // Extract rows containing user data
        return res.status(200).json({ message: "OK", users })
    } catch (err) {
        res.status(400).json({ message: "EROOR", cause: err.message })
    }
}
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = userSchema.parse(req.body);//validating input
        //checking email
        const emailCheck = await pool.query("SELECT * FROM users WHERE email =$1 ", [email])
        if (emailCheck.rows.length > 0) { //Checks if the query returned at least one row If true, it indicates the email is already in use.
            return res.status(400).json({
                message: "Error creating user",
                cause: "Email already in use",
            })
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const result = await pool.query(
            "INSERT INTO users (name, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *",
            [name, email, hashedPassword]
        );

        // Return success response with user info
        return res.status(201).json({
            message: "User created successfully",
            userId: result.rows[0].user_id.toString()
        });
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map(e => e.message), // Extract error messages
            });
        }
        console.error("Error during user signup:", err.message);
        return res.status(400).json({
            message: "Error creating user",
            cause: err.message,
        });
    }
};
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = LoginSchema.parse(req.body);
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        // 2. Check if the user exists in the database
        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid credentails"
            })
        }
        const user = result.rows[0];
        // 3. Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            })
        }
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true , signed:true,path:"/"
        })

        // 4. Generate a token
        const token=createToken(user.user_id.toString(),user.email,"7d")
        // 5 .Sendin Cookie
        const expires=new Date();
        expires.setDate(expires.getDate()+7)
         res.cookie(COOKIE_NAME,token,{path:"/",expires, httpOnly:true , signed:true})
        return res.status(201).json({
            message: "Login successfully",
            userId: result.rows[0].user_id.toString()
        });
    } catch (err:any) {
        if (err instanceof z.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map(e => e.message), // Extract error messages
            });
        }
        console.error('Login Error:', err);
        return res.status(500).json({
            message: 'Something went wrong',
            cause: err.message,
        });
    }
}
import { NextFunction, Request, Response } from "express";
import pool from "../db/connection.js";
import bcrypt from "bcryptjs";
import { z } from "zod";

const userSchema= z.object({
    name:z.string().min(2,"Name is Required"),
    email:z.string().email("Invalid email Format"),
    password:z.string().min(6,"Password must contain at least 6 characters")
})
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        const users=result.rows; // Extract rows containing user data
        return res.status(200).json({message:"OK" ,users})
    } catch (err) {
        res.status(400).json({message:"EROOR",cause:err.message})
    }
}
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } =userSchema.parse(req.body) ;//validating input
        //checking email
        const emailCheck= await pool.query("SELECT * FROM users WHERE email =$1 ",[email])
        if(emailCheck.rows.length >0){ //Checks if the query returned at least one row If true, it indicates the email is already in use.
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

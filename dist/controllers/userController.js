import pool from "../db/connection.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        const users = result.row; // Extract rows containing user data
        return res.status(200).json({ message: "OK", users });
    }
    catch (err) {
        res.status(400).json({ message: "EROOR", cause: err.message });
    }
};
//# sourceMappingURL=userController.js.map
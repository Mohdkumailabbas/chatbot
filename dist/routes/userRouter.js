import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/userController.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
export default userRouter;
//# sourceMappingURL=userRouter.js.map
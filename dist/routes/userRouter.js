import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
export default userRouter;
//# sourceMappingURL=userRouter.js.map
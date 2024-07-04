import express from "express";
import {
  Register,
  fetchdata,
  filter,
  login,
} from "../controller/usercontroller.js";
import { verifyToken } from "../middleware/useauth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", login);

router.get("/view",verifyToken, fetchdata);
router.get("/filter",verifyToken, filter);

export default router;

import  express  from "express";
import { getDashboardStatus, getuser } from "../controllers/general.js";



const router = express.Router();

router.get("/user/:id", getuser);
router.get("/dashboard", getDashboardStatus );

export default router;
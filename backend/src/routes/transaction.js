import express from "express";
import { getTransactions, createTransactions } from "../controllers/transaction";

const router = express.Router()

router.get("/:id", getTransactions)
router.post("/:account", createTransactions)

export default router;
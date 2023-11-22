import express from "express";
import { getAccounts, createAccount, deleteAccount, updateAccount, getByUser } from "../controllers/account"

const router = express.Router()

router.get("/", getAccounts)
router.get("/:id", getByUser)
router.post("/", createAccount)
router.put("/:id", updateAccount)
router.delete("/:id", deleteAccount)

export default router;
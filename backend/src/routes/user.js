import express from "express";
import { getUsers, createUser, searchUser, deleteUser, updateUser } from "../controllers/user"

const router = express.Router()

router.get("/", getUsers)
router.get("/search", searchUser)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


export default router;
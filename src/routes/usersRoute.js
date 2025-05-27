const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  deleteUsers,
} = require("../controllers/userController");

router.post("/", createUser);

router.get("/", getAllUsers);
router.delete("/:id", deleteUsers);

module.exports = router;

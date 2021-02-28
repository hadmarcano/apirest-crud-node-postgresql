const { Router } = require("express");
const router = Router();

// middlewares

const {
  getUser,
  // createUser,
  getUserById,
  deleteUser,
  updateUser,
  usersControllers,
} = require("../middlewares/user");

// routers

router.get("/users", getUser);

router.get("/users/:id", getUserById);

router.post("/users", usersControllers.createOne);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

module.exports = router;

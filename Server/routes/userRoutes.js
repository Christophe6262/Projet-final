const { Router } = require("express");
const router = Router();

const {
  authenticateUser,
} = require("../middlewares/authentificationMiddleware.js");
const { getUser } = require("../controllers/userController.js");

router.get("/current-user", authenticateUser, getUser);

module.exports = router;

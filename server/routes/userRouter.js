const Router = require("express");
const { check, login, registration } = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/auth", authMiddleware, check);

module.exports = router;

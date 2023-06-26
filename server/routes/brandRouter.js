const Router = require("express");
const router = new Router();
const { create, getAll } = require("../controllers/brandController");
const checkRole = require('../middleware/checkRoleMiddleware');

router.post("/", create);
router.get("/", getAll);

module.exports = router;

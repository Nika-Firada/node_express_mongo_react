const { User, Basket } = require("../models/Model");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("wrong Email or password"));
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      return next(ApiError.badRequest("User already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      role,
      password: hashPassword,
    });
    const basket = await Basket.create({
      user: user._id,
    });
    const token = generateJwt(user._id, user.email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(ApiError.internal("User not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("User not found"));
    }
    const token = generateJwt(user._id, user.email, user.role);
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user._id, req.user.email, req.user.role);
    return res.json({token})
  }
}
module.exports = new UserController();

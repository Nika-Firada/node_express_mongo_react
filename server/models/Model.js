const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "USER" },
    basket: { type: mongoose.Schema.Types.ObjectId, ref: "Basket" },
  },
  { timestamps: true }
);

const basketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const basketDeviceSchema = new mongoose.Schema(
  {
    basket: { type: mongoose.Schema.Types.ObjectId, ref: "Basket" },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  },
  { timestamps: true }
);

// const deviceSchema = new mongoose.Schema(
//   {
//     name: { type: String, unique: true, required: true },
//     price: { type: Number, required: true },
//     rating: { type: Number, default: 0 },
//     img: { type: String, required: true },
//     ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
//     type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
//     brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
//   },
//   { timestamps: true }
// );
const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    img: { type: String, required: true },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    typeId: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    info: [{ type: mongoose.Schema.Types.ObjectId, ref: "DeviceInfo" }],
  },
  { timestamps: true }
);

const typeSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const ratingSchema = new mongoose.Schema(
  {
    rate: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  },
  { timestamps: true }
);

const deviceInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  },
  { timestamps: true }
);


const typeBrandSchema = new mongoose.Schema(
  {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Basket = mongoose.model("Basket", basketSchema);
const BasketDevice = mongoose.model("BasketDevice", basketDeviceSchema);
const Device = mongoose.model("Device", deviceSchema);
const Type = mongoose.model("Type", typeSchema);
const Brand = mongoose.model("Brand", brandSchema);
const Rating = mongoose.model("Rating", ratingSchema);
const DeviceInfo = mongoose.model("DeviceInfo", deviceInfoSchema);
const TypeBrand = mongoose.model("TypeBrand", typeBrandSchema);

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  DeviceInfo,
  TypeBrand,
};

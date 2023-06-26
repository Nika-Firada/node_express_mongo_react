const { Device, DeviceInfo } = require("../models/Model");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
  
      if (info) {
        info = JSON.parse(info);
        const deviceInfoPromises = info.map((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            device: device._id,
          })
        );
        await Promise.all(deviceInfoPromises);
        device.info = deviceInfoPromises.map((doc) => doc._id);
        await device.save();
      }
  
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 9;
    const skipCount = (page - 1) * limit;

    let devices;
    let totalDevicesCount;

    if (!brandId && !typeId) {
      devices = await Device.find().skip(skipCount).limit(limit).lean().exec();
      totalDevicesCount = await Device.countDocuments();
    } else if (brandId && !typeId) {
      devices = await Device.find({ brandId })
        .skip(skipCount)
        .limit(limit)
        .lean()
        .exec();
      totalDevicesCount = await Device.countDocuments({ brandId });
    } else if (!brandId && typeId) {
      devices = await Device.find({ typeId })
        .skip(skipCount)
        .limit(limit)
        .lean()
        .exec();
      totalDevicesCount = await Device.countDocuments({ typeId });
    } else {
      devices = await Device.find({ brandId, typeId })
        .skip(skipCount)
        .limit(limit)
        .lean()
        .exec();
      totalDevicesCount = await Device.countDocuments({ brandId, typeId });
    }

    return res.json({ devices, totalDevicesCount });
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({ _id: id }).populate('info').lean().exec();
    return res.json(device);
  }
}

module.exports = new DeviceController();

const Driver = require("../models/driver");

module.exports = {
  // NOTE:
  // Old Style -> greeting: function(req, res){}
  // ES6 Style -> greeting(req, res){}

  greeting(req, res) {
    res.send({ hi: "there" });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;
    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          distanceField: "dist.calculated",
          spherical: true,
          maxDistance: 200000 // 200000 -> 200 KM
        }
      }
    ])
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};

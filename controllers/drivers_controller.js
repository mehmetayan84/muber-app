const Driver = require('../models/driver');

module.exports = {

    greetings(req, res) {
        res.send({hi: 'there'})
    },

    createDriver(req, res, next) {

        /*const tempDriver = new Driver(req.body);
        tempDriver.save()
            .then((driver) => res.send(driver));*/

        Driver.create(req.body)
            .then((driver) => res.send(driver))
            .catch(next); //next -> same (err) => next(err)
    },

    editDriver(req, res, next) {
        Driver.findByIdAndUpdate(req.params.id, req.body)
            .then(() => Driver.findById(req.params.id))
            .then(driver => res.send(driver))
            .catch(next);

    },

    deleteDriver(req, res, next) {
      Driver.findByIdAndRemove(req.params.id)
          .then((driver) => res.status(204).send(driver))
          .catch(next);
    },

    indexDrivers(req, res, next) {
        const { lng, lat } = req.query; // same as const lng = req.query.lng and const lat = req.query.lat

        Driver.aggregate([
            {
                $geoNear: {
                    near: {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
                    distanceField: "dist.calculated",
                    spherical: true,
                    maxDistance: 200000
                }
            }
        ])
        .then((drivers) => {
           res.send(drivers);
        }).catch(next);
    }

};
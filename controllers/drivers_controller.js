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

    }

}
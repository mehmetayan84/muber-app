const Driver = require('../models/driver');

module.exports = {

    greetings(req, res) {
        res.send({hi: 'there'})
    },

    createDriver(req, res) {

        /*const tempDriver = new Driver(req.body);
        tempDriver.save()
            .then((driver) => res.send(driver));*/

        Driver.create(req.body)
            .then((driver) => res.send(driver));

    }

}
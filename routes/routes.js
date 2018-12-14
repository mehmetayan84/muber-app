const driver_controller = require('../controllers/drivers_controller');

module.exports = (app) => {

    app.get('/api', driver_controller.greetings);

    app.post('/api/drivers', driver_controller.createDriver);

    app.put('/api/drivers/:id', driver_controller.editDriver);

    app.delete('/api/drivers/:id', driver_controller.deleteDriver);

    app.get('/api/drivers', driver_controller.indexDrivers);

};
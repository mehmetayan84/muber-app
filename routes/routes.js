const driver_controller = require('../controllers/drivers_controller');

module.exports = (app) => {

    app.get('/api', driver_controller.greetings);

    app.post('/api/drivers', driver_controller.createDriver);

}
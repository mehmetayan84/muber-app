const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose'); //because mongoose doesn't play very well with mocha
const app = require('../../app');

const Driver = mongoose.model('driver'); //because mongoose doesn't play very well with mocha

describe('Drivers controller', () => {

    it('handles a POST request to /api/drivers', (done) => {

        Driver.countDocuments()
            .then((count) => {
                request(app)
                    .post('/api/drivers')
                    .send({
                        "email": "example@example.com"
                    })
                    .end(() => {
                        Driver.countDocuments().then((theNewCount) => {
                            assert(theNewCount === count + 1);
                            done();
                        });
                    });
            });
    });

    it('PUT to /api/drivers/:id edits an existing driver', done => {
        const driver = new Driver({email: "test@test.com", driving: false});
        driver.save()
            .then(() => {
                request(app)
                    .put(`/api/drivers/${driver._id}`)
                    .send({driving: true})
                    .end(() => {
                       Driver.findById(driver._id)
                           .then((driverModified) => {
                              assert(driverModified.driving === true);
                              done();
                           });
                    });
            })
    });

    it('DELETE to /api/drivers/:id deletes an existing driver', done => {
        const driver = new Driver({email: "test@test.com", driving: false});
        driver.save()
            .then(() => {
                Driver.countDocuments()
                    .then(count => {
                        Driver.find({})
                            .then(() => {
                                request(app)
                                    .delete(`/api/drivers/${driver._id}`)
                                    .end(() => {
                                        Driver.countDocuments()
                                            .then((lastCount) => {
                                                assert(lastCount === count - 1);
                                                done();
                                            })
                                    })
                            })
                    })
            });
    });

    it('GET to /api/drivers and finds drivers in a location', done => {
       const seattleDriver = new Driver({
           email: 'seattle@test.com',
           geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628]}
       });

        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.253, 25.791]}
        });

        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
               request(app)
                   .get('/api/drivers?lng=-80&lat=25')
                   .end((err, response) => {
                       assert(response.body.length === 1);
                       assert(response.body[0].email === 'miami@test.com');
                       done();
                   })
            });
    });

});
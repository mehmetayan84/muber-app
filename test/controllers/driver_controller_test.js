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

});
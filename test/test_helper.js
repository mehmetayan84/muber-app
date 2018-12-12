const mongoose = require('mongoose');

before(done => {
   mongoose.connect('mongodb://localhost/muber_test', { useNewUrlParser: true });
   mongoose.connection
       .once('open', () => done())
       .on('error', err => {
          console.warn('The connection can not be established', err);
       });
});

beforeEach(done => {
    const {drivers} = mongoose.connection.collections;
    drivers.drop()
        .then(() => done())
        .catch(() => done());
}) ;
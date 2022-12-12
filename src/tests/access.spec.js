const controller = require('../controllers/access.controller');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const should = chai.should();
const {
    assert,
    expect,
} = chai;

describe('Access Controller', function() {
    describe('#createUser()', function() {

        // this.beforeAll('Connect to database', function() {
        //     const mongoose = require(mongoose);
        //     const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/scumDB';
        //     mongoose.connect(mongoUrl, (err) => {
        //     if (err)
        //         console.log('Error connecting to database!');
        //     else
        //         console.log('Database connected successfully!');
        //     });
        // });

        // this.afterAll('Clear users collection', _ => {
        //     controller._clearUsersCollection()
        // });

        it('Should throw error if no arg or arg missing key', function() {
            const noArgs = controller.createUser();
            const argMissing = controller.createUser({
                username: 'test',
                email: 'test'
                // missing password
            });

            return Promise.all([
                expect(noArgs).to.be.rejected,
                expect(argMissing).to.be.rejected
            ]);
        });

        // it('Should create valid user', function(done) {
        //     this.timeout(10000);

        //     const user = controller.createUser({
        //         username: 'test',
        //         email: 'test',
        //         password: 'test'
        //     });

        //     user.then((value) => {
        //         done();
        //     });
        // })
    });

    describe('#generatePasswordObj()', function() {
        it('Should generate password object with two fields, "salt" and "hash"', function(done) {
            controller.generatePasswordObj('test').then(value => {
                const objectKeys = Object.keys(value);

                value.should.be.a('object', 'Is proper type');
                expect(objectKeys.length).to.equal(2, 'Is proper size');
                expect(objectKeys).to.contain.members(['salt', 'hash'], 'Contains proper keys');

                done();
            });
        });

        it('Should throw error if no arg provided or not a string', function() {
            const noArgs = controller.generatePasswordObj();
            const notStrg = controller.generatePasswordObj(100);

            return Promise.all([
                expect(noArgs).to.be.rejected,
                expect(notStrg).to.be.rejected
            ]);
        });
    });
});
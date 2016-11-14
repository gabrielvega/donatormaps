var expect = require('chai').expect;
var sinon = require('sinon');

var Donator = require('../models/donator');

describe('donator', function() {
	it('should be invalid if first name is empty', function(done) {
		var m = new Donator();

		m.validate(function(err) {
			expect(err.errors.firstName).to.exist;
			done();
		});
	});

	it('should be invalid if last name is empty', function(done) {
    		var m = new Donator();

    		m.validate(function(err) {
    			expect(err.errors.lastName).to.exist;
    			done();
    		});
    });

    it('should be invalid if address is empty', function(done) {
        		var m = new Donator();

        		m.validate(function(err) {
        			expect(err.errors.address).to.exist;
        			done();
        		});
        });

	it('should be invalid if contact number is empty', function(done) {
    		var m = new Donator();

    		m.validate(function(err) {
    			expect(err.errors.contactNumber).to.exist;
    			done();
    		});
    });

    it('should be invalid if email is empty', function(done) {
        		var m = new Donator();
            m.validate(function(err) {
                expect(err.errors.email).to.exist;
                done();
            });
    });

    it('should be invalid if loc is empty', function(done) {
        		var m = new Donator();

        		m.validate(function(err) {
        			expect(err.errors.loc).to.exist;
        			done();
        		});
    });



	it('should check for donators with same email', sinon.test(function() {
		this.stub(Donator, 'findOne');
		var expectedName = 'This email should be used in the check';
		var m = new Donator({ email: expectedName });

		m.checkForDuplicateEmails(function() { });

		sinon.assert.calledWith(Donator.findOne, {
			email: expectedName
		});
	}));


	it('should call back with true when email exists', sinon.test(function(done) {
		var repostObject = { email: 'gaveho@gmail.com' };
		this.stub(Donator, 'findOne').yields(null, repostObject);
		var m = new Donator({ email: 'otheremail@gmail.com' });

		m.checkForDuplicateEmails(function(emailExists) {
			expect(emailExists).to.be.true;
			done();
		});
	}));

	it('should check for donators with same email', sinon.test(function() {
        this.stub(Donator, 'findOne');
        var expectedEmail = 'This name should be used in the check';
        var m = new Donator({ email: expectedEmail });

        m.checkForDonators(function() { });

        sinon.assert.calledWith(Donator.findOne, {
            email: expectedEmail
        });
    }));

    it('should call back with true when donator exists', sinon.test(function(done) {
        var repostObject = { email: 'gaveho@gmail.com' };
        this.stub(Donator, 'findOne').yields(null, repostObject);
        var m = new Donator({ email: 'some name' });

        m.checkForDonators(function(hasDonator) {
            expect(hasDonator).to.be.true;
            done();
        });
    }));

});
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io-client');
var ioOptions = { transports: ['websocket'], forceNew: true, reconnection: false }
var assert = require('assert');
var Donator = require('../models/donator');
var donator = new Donator({
            firstName: "Gabriel",
            lastName: "Vega",
            address: "Avenida Norte, Catia La Mar, Vargas, Vargas",
            contactNumber: "+58 414 2769 178",
            email: "gaveho@gmail.com",
            bloodGroup: "A+",
            ip: "127.0.0.1",
            loc: {lng: -66.2827323841162 , lat: 10.664510820517},
            created: "Sun Nov 13 2016 23:23:52 GMT+0000 (UTC)"
        });


describe('Socket.io tests', function() {

	beforeEach(function(done){

        // connect two io clients
        sender = io('http://localhost:3000/', ioOptions)
        receiver = io('http://localhost:3000/', ioOptions)

        // finish beforeEach setup
        done()
      });

      afterEach(function(done){

        // disconnect io clients after each test
        sender.disconnect()
        receiver.disconnect()
        done()
      });

	describe('new donator', function(){
        it('The Donator signed up is the same the other patients receive', function(done){
          sender.emit('donator', donator);
          receiver.on('update', function(donatorExpected){
            expect(donatorExpected.firstName).to.equal(donator.firstName)
            expect(donatorExpected.lastName).to.equal(donator.lastName)
            expect(donatorExpected.address).to.equal(donator.address)
            expect(donatorExpected.contactNumber).to.equal(donator.contactNumber)
            expect(donatorExpected.email).to.equal(donator.email)
            expect(donatorExpected.bloodGroup).to.equal(donator.bloodGroup)
            done()
          })
        })
      })


    describe('donators list', function(){
            it('The Donator"s list has the same lentg that the users receive', function(done){
              sender.emit('login', {longitude: -66.2827323841162, latitude: 10.664510820517, id: "00000000000000000000000"});
              sender.on('login', function(donatorExpected) {
                expect(donatorExpected.length).to.not.equal(-1)
                done()
              })
            })
          })

 })
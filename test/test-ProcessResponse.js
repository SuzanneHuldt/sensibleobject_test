'use strict';
var chai = require('chai');
var expect = require('chai').expect;
const ProcessResponse = require('./../lib/ProcessResponse.js');
const processresponse = new ProcessResponse();
const welcomeSuccessfulOutput = JSON.stringify({ "output": "<speak>Welcome to Question Time! Which of these is the largest? A. a tennis ball, B. a bowling ball, C. a house, or D. the sun</speak>" });


it('returns welcome output', function(){
    expect(processresponse.returnResponse("welcomeSuccessful")).to.equal(welcomeSuccessfulOutput);
});

'use strict';
var chai = require('chai');
var expect = require('chai').expect;

const ProcessRequest = require('./../lib/ProcessRequest.js');
const processrequest = new ProcessRequest;
const request1 = { "userId": "1234", "type": "LaunchRequest" };
const request2 = { "userId": "1234", "type": "IntentRequest", "intent": { "values": [{ "locale": "en_US", "type": "answer", "slot": "d" }] } };
const welcomeSuccessfulOutput = JSON.stringify({ "output": "<speak>Welcome to Question Time! Which of these is the largest? A. a tennis ball, B. a bowling ball, C. a house, or D. the sun</speak>" });


it('returns user id for user setting', function(){
    expect(processrequest.extractFromJson(request1, "user")).to.equal("1234");
});
it('returns type for type setting', function(){
    expect(processrequest.extractFromJson(request1, "type")).to.equal("LaunchRequest");
});
it('returns answer for answer setting', function(){
    expect(processrequest.extractFromJson(request2, "answer")).to.equal("d");
});
xit('returns answer correct', function(){
    expect(processrequest.processRequest(request2)).to.equal(true);
});
xit('returns question', function(){
    expect(processrequest.processRequest(request1)).to.equal(welcomeSuccessfulOutput);
});
it('returns user id', function(){
  expect(processrequest.grabUserId(request1)).to.equal("1234");
})

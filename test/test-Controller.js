'use strict';
var chai = require('chai');
var expect = require('chai').expect;
const Controller = require('./../lib/Controller.js');
const welcomeSuccessfulOutput = JSON.stringify({ "output": "<speak>Welcome to Question Time! Which of these is the largest? A. a tennis ball, B. a bowling ball, C. a house, or D. the sun</speak>" });
const welcomeUnsuccessfulOutput = JSON.stringify({ "output":"<speak>Welcome back to Question Time! Sorry, but you've already answered the question.</speak>"});
const answerSuccessfulOutput = JSON.stringify({ "output":"<speak>That's right! Thanks for playing.</speak>" });
const answerIncorrectOutput = JSON.stringify({ "output": "<speak>Sorry, that's wrong! Thanks for playing.</speak>" });
const answerUnSuccessfulOutput = JSON.stringify({ "output":"<speak>Sorry! Looks like you've already tried to answer this one!</speak>" });
const correctAnswerInput = { userId: "1234", type: "IntentRequest", intent: { values: [{ locale: "en_US", type: "answer", slot: "d" }] } }
const incorrectAnswerInput = { userId: "1234", type: "IntentRequest", intent: { values: [{ locale: "en_US", type: "answer", slot: "c" }] } }
const launchInput = { userId: "1234", type: "LaunchRequest" };

describe('happy path', function(){
  var controller = new Controller;
  it('returns a question to initial LaunchRequest', function(){
    expect(controller.processInput(launchInput)).to.equal(welcomeSuccessfulOutput);
  });
  it('returns an answer to IntentRequest', function(){
    expect(controller.processInput(correctAnswerInput)).to.equal(answerSuccessfulOutput);
  });
});

describe('unhappy path: answer before question', function(){
  var controller = new Controller;
  it('returns error message if IntentRequest sent before LaunchRequest', function(){
    expect(controller.processInput(correctAnswerInput)).to.equal(answerUnSuccessfulOutput);
  });
});

describe('unhappy path: question asked twice ', function(){
  var controller = new Controller;
  controller.processInput(launchInput);
  it('returns error message if question asked twice with LaunchRequest', function(){
    expect(controller.processInput(launchInput)).to.equal(welcomeUnsuccessfulOutput);
  });
});

describe('unhappy path: wrong answer', function(){
  var controller = new Controller;
  controller.processInput(launchInput);
  it('returns error message if answer is wrong with IntentRequest', function(){
    expect(controller.processInput(incorrectAnswerInput)).to.equal(answerIncorrectOutput);
  });
});

describe('unhappy path: question answered twice', function(){
  var controller = new Controller;
  controller.processInput(launchInput);
  controller.processInput(incorrectAnswerInput);
  var controller = new Controller;
  it('returns error message if answer is attempted twice with IntentRequest', function(){
    expect(controller.processInput(correctAnswerInput)).to.equal(answerUnSuccessfulOutput);
  });
});

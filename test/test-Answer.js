'use strict';
var chai = require('chai');
var expect = require('chai').expect;
const Answer = require('./../lib/Answer.js');
const answer = new Answer;

it('returns true for the correct answer', function(){
    expect(answer.isCorrect("d")).to.equal(true);
});

it('returns false for an incorrect answer', function(){
    expect(answer.isCorrect("c")).to.equal(false);
});

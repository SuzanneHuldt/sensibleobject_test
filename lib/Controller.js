const Answer = require('./Answer.js');
const answer = new Answer;
const ProcessResponse = require('./ProcessResponse.js');
const processresponse = new ProcessResponse;
const ProcessRequest = require('./ProcessRequest.js');
const processrequest = new ProcessRequest;

class Controller{
  constructor(){
    this.questionCounter = [];
    this.answerCounter = [];
  }

  processInput(request){
    request = JSON.parse(request);
    //console.log(this.questionCounter.length)
    if(processrequest.isLaunch(request)){
      //console.log("hello")
      this.questionCounter.push(processrequest.grabUserId(request));
      try{
        return this.getResponse(processrequest.isValid(request, this.questionCounter), "welcomeSuccessful")
      } catch(error)
    {
        return this.getResponse(true, "welcomeUnsuccessful")
      }
      //console.log(processrequest.grabUserId(request));
    }
    if(processrequest.isIntent(request)){
      this.answerCounter.push(processrequest.grabUserId(request));
      try{
        return this.getResponse(processrequest.isValid(request, this.answerCounter), answer.returnAnswer(processrequest.grabUserId(request)))
      } catch(error){
        return this.getResponse(true, "answerUnsuccessful")
      }
    }
  }

  getResponse(value, type){
    if(value){
      return processresponse.returnResponse(type)
    }
  }
}
module.exports = Controller;

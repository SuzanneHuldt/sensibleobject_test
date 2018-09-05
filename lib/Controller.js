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
    if(processrequest.isLaunch(request)){
      try{
        return this.getResponse(processrequest.isValid(request, this.questionCounter), "welcomeSuccessful")
      } catch(error){
        return this.getResponse(true, "welcomeUnsuccessful")
      }
      finally{
        this.questionCounter.push(processrequest.grabUserId(request));
      }
    }
    if(processrequest.isIntent(request)){
      try{
        return this.getResponse(processrequest.hasReceivedQuestion(request, this.questionCounter, this.answerCounter), answer.returnAnswer(processrequest.grabAnswer(request)))
      } catch(error){
        return this.getResponse(true, "answerUnsuccessful")
      }
      finally{
        this.answerCounter.push(processrequest.grabUserId(request));
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

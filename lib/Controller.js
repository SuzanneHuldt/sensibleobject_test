const Answer = require('./Answer.js');
const answer = new Answer;
const ProcessResponse = require('./ProcessResponse.js');
const processresponse = new ProcessResponse;
const ProcessRequest = require('./ProcessRequest.js');
const processrequest = new ProcessRequest;
/**
* Handles all interaction with server and passes request input to relevant classes for processing
* @class
*/
class Controller{
  /**
  * Initialises class instance with counter arrays for questions (LaunchRequest) and answers (intentRequest)
  * note that as this is set when the controller instance is created when the server is started, users are
  * always restricted from 'double asking' or 'double answering' until server is restarted
  * @constructor
  *
  */
  constructor(){
    this.questionCounter = [];
    this.answerCounter = [];
  }
  /**
  * Takes request data from server and outputs data for response
  * @param {object} request
  * @return {string} output json
  */
  processInput(request){
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
  /**
  * Returns correct response body from the Response class based on type input
  * @param {boolean} value
  * @param {string} type
  * @return {string} output body
  */
  getResponse(value, type){
    if(value){
      return processresponse.returnResponse(type)
    }
  }
}
module.exports = Controller;

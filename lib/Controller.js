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
      return this.sendLaunch(request);
    }
    if(processrequest.isIntent(request)){
      return this.sendIntent(request);
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
  /**
  * Sends launch response to ProcessRequest and returns response from ProcessResponse
  * @param {object} request
  * @return {string} output json
  */
  sendLaunch(request){
    try{
      return this.getResponse(processrequest.isValid(request, this.questionCounter), "welcomeSuccessful")
    } catch(error){
      return this.getResponse(true, "welcomeUnsuccessful");
    }
    finally{
      this.questionCounter.push(processrequest.grabUserId(request));
    }
  }
  /**
  * Sends intent response to ProcessRequest and Answer and returns response from ProcessResponse
  * @param {object} request
  * @return {string} output json
  */
  sendIntent(request){
    try{
      return this.getResponse(processrequest.processIntent(request, this.questionCounter, this.answerCounter), answer.returnAnswer(processrequest.grabAnswer(request)))
    } catch(error){
      return this.handleAnswerError(error);
    }
    finally{
      this.answerCounter.push(processrequest.grabUserId(request));
    }
  }
  /**
  * Handles answer error and returns appropriate input to ProcessResponse (through getResponse) based on error string identity
  * @param {error} error
  * @return {string} output json
  */
  handleAnswerError(error){
    var errorType = error
    if(errorType == "invalid-no-question"){
      this.answerCounter.pop()
      return this.getResponse(true, "answerUnsuccessful-no-question");
    }else if(errorType == "invalid"){
      return this.getResponse(true, "answerUnsuccessful");
    }
  }
}
module.exports = Controller;

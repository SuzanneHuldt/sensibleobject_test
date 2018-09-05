/**
* Handles all response processing passed from Controller.
* @class
*/
class ProcessResponse{
  /**
  * Initialises class instance with responses object.
  * @constructor
  *
  */
  constructor(){
    this.responses = {"welcomeSuccessful": "<speak>Welcome to Question Time! Which of these is the largest? A. a tennis ball, B. a bowling ball, C. a house, or D. the sun</speak>",
     "welcomeUnsuccessful": "<speak>Welcome back to Question Time! Sorry, but you've already answered the question.</speak>",
     "answerSuccessful": "<speak>That's right! Thanks for playing.</speak>",
      "answerUnsuccessful": "<speak>Sorry! Looks like you've already tried to answer this one!</speak>", "answerIncorrect": "<speak>Sorry, that's wrong! Thanks for playing.</speak>"
    }
  }
  /**
  * Generates response json
  * @param {string} body
  * @return {string} output json
  */
  generateResponse(body){
    return JSON.stringify({"output": body});
  }
  /**
  * Returns body text based on input type from class responses object
  * @param {string} type
  * @return {string} body text
  */
  returnResponse(type){
    switch(type){
      case "welcomeSuccessful":
        return this.generateResponse(this.responses.welcomeSuccessful);
        break;
      case "welcomeUnsuccessful":
        return this.generateResponse(this.responses.welcomeUnsuccessful);
        break;
      case "answerSuccessful":
        return this.generateResponse(this.responses.answerSuccessful);
        break;
      case "answerUnsuccessful":
        return this.generateResponse(this.responses.answerUnsuccessful);
        break;
      case "answerIncorrect":
      return this.generateResponse(this.responses.answerIncorrect);
      break;
    }
  }
}

module.exports = ProcessResponse;

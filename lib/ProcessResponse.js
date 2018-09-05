
class ProcessResponse{
  constructor(){
    this.responses = {"welcomeSuccessful": "<speak>Welcome to Question Time! Which of these is the largest? A. a tennis ball, B. a bowling ball, C. a house, or D. the sun</speak>",
     "welcomeUnsuccessful": "<speak>Welcome back to Question Time! Sorry, but you've already answered the question.</speak>",
     "answerSuccessful": "<speak>That's right! Thanks for playing.</speak>",
      "answerUnsuccessful": "<speak>Sorry! Looks like you've already tried to answer this one!</speak>", "answerIncorrect": "<speak>Sorry, that's wrong! Thanks for playing.</speak>"
    }
  }

  generateResponse(body){
    return JSON.stringify({"output": body});
  }

  returnResponse(type){
    switch(type){
      case "welcomeSuccessful":
        return this.generateResponse(this.responses.welcomeSuccessful);
        break;
      case "welcomeUnsuccessful":
        return this.generateResponse(this.responses.welcomeUnsuccessful);
        break;
      case "answerSuccesful":
        return this.generateResponse(this.responses.answerSuccesful);
        break;
      case "answerUnsuccesful":
        return this.generateResponse(this.responses.answerUnsuccesful);
        break;
      case "answerIncorrect":
      return this.generateResponse(this.responses.answerIncorrect);
      break;
      // default:
      //   throw "Sorry, something went wrong!"
    }
  }
}

module.exports = ProcessResponse;

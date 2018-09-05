/**
* Handles all request processing passed by the Controller.
* @class
*/
class ProcessRequest{
  /**
  * Returns the user id from js object
  * @param {object} request
  * @return {string} userId
  */
  grabUserId(request){
    return this.extractFromJson(request, "user");
  }
  /**
  * Returns the answer from js object
  * @param {object} request
  * @return {string} answer
  */
  grabAnswer(request){
    return this.extractFromJson(request, "answer");
  }
  /**
  * Checks that the request is of type launch
  * @param {object} request
  * @return {boolean}
  */
  isLaunch(request){
    return this.extractFromJson(request, "type") == "LaunchRequest";
  }
  /**
  * Checks that the request is of type intent
  * @param {object} request
  * @return {boolean}
  */
  isIntent(request){
    return this.extractFromJson(request, "type") == "IntentRequest";

  }
  /**
  * Checks that the request type is valid - ie. not been made before
  * @param {object} request
  * @param {array} counter
  * @return {boolean}
  * @throws {error} invalid
  */
  isValid(request, counter){
    if(this.isFirstTry(this.extractFromJson(request, "user"), counter)){
      return true}else{
        throw "invalid"
      }
  }
  /**
  * Checks that an answer request is valid - ie. is responding to a question
  * @param {object} request
  * @param {array} counter
  * @param {array} counter
  * @return {boolean}
  * @throws {error} invalid
  */
  hasReceivedQuestion(request, questionCounter, answerCounter){
    if(this.isFirstTry(this.extractFromJson(request, "user"), answerCounter) && !this.isFirstTry(this.extractFromJson(request, "user"), questionCounter)){
      return true
    }else{
      throw "invalid"
    }
  }
  /**
  * Checks that the request type is valid - ie. not been made before
  * @param {string} user
  * @param {array} counter
  * @return {boolean}
  */
  isFirstTry(user, counter){
    if(counter.length == 0){
      return true
    } else {
      for(var i = 0; i < counter.length; i++){
        if(counter[i] == user){
          return false
        }else{
          return true
        }
      }
    }
 }
/**
* Returns values from js object according to value type
* @param {object} resquest
* @param {string} value
* @return {string} value
*/
  extractFromJson(request, value){
    switch(value){
      case "user":
        return request.userId;
        break;
      case "type":
        return request.type;
        break;
      case "answer":
        return request.intent.values[0].slot;
        break;
    }
  }


}
 module.exports = ProcessRequest;

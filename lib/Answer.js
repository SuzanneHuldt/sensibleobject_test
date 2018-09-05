/**
* Handles all answer processing passed by the Controller.
* @class
*/
class Answer{
  /**
  * Returns required successful or unsuccessful values for answer
  * @param {string} answer
  * @return {string} answer value
  */
  returnAnswer(answer){
    if(this.isCorrect(answer)){
      return "answerSuccessful";
    }else{
      return "answerIncorrect";
    }
  }
  /**
  * Returns answer value - please note - this is hardcoded here as the question provided in the json input does not carry a
  * unique identifier (compared to the user that does). In extended this feature, it would be logical to pull answers from a
  * database searched by a unique identifier belonging to the question.
  * @param {string} answer
  * @return {boolean} answer value
  */
  isCorrect(answer){
    return answer == "d"
  }

}
module.exports = Answer;

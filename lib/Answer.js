
class Answer{

  returnAnswer(answer){
    if(this.isCorrect(answer)){
      return "answerSuccessful";
    }else{
      return "answerIncorrect";
    }
  }

  isCorrect(answer){
    return answer === "d"
  }

}
module.exports = Answer;

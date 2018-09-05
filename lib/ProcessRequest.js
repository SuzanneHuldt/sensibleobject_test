
class ProcessRequest{

  grabUserId(request){
    return this.extractFromJson(request, "user");
  }

  isLaunch(request){
    return this.extractFromJson(request, "type") == "LaunchRequest";
  }

  isIntent(request){
    return this.extractFromJson(request, "type") == "IntentRequest";

  }

  isValid(request, counter){
    if(isFirstTry(this.extractFromJson(request, "user"), counter)){
      return true}else{
        throw "invalid"
      }
  }

  isFirstTry(user, counter){
    for (var i = 0,len = counter.length; i < len; i++){
      if(counter[i] == user){
        return false
      } else {
        return true
      }
    }
  }

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

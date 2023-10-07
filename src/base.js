

const config = require('./config')

module.exports =  class Base {
  tip(msg){
    if(config.test){
      console.log(msg);
    }
  }
  
}
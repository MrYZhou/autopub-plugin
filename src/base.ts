

const config = require('./config')

export class Base {
  tip(msg: any){
    if(config.test){
      console.log(msg);
    }
  }
  
}
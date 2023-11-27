

const config = require('./config')

export class Base {

  static time(label: string) {
    if(config.test){
      console.time(label)
    }
  }

  static timeEnd(label: string) {
    if(config.test){
      console.timeEnd(label)
    }
  }
 
  static tip(msg: any) {
    if(config.test){
      console.log(msg);
    }
  }
  
}
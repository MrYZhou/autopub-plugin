const vscode = require('vscode');
const Base = require('../base');
module.exports = class B extends Base{
  registe(context) {
    super.tip('功能点2注册')
  }
  
  unload(){
  }
}
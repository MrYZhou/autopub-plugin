
import {Base} from './base'
Base.time('导入模块');
const modules = require('./export')
Base.timeEnd('导入模块');
function activate(context: any) {
  for (let module of modules) {
    module.registe(context)
  }
  
}
function deactivate() {
  for (let module of modules) {
    module.unload()
  }
}

module.exports = {
  activate,
  deactivate
};
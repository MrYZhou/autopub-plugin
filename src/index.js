const modules = require('./export')

function activate(context) {
  // 功能点注册
  for (let module of modules) {
    module.registe(context)
  }
}

function deactivate() {
  // 执行插件清理
  console.log('执行插件清理');
  for (let module of modules) {
    module.unload()
  }
}

module.exports = {
  activate,
  deactivate
};
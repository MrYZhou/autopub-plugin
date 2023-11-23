const modules = require('./export')

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

const path = require('path');

let url = path.join(__dirname, 'command')
const files = ['treeContainer','gitJump','treeStatusBar']

let modules: any[] = []
let actions: Promise<any>[] = []
for (let index = 0; index < files.length; index++) {
  actions.push(new Promise((res, rej) => {
    let module = require(path.join(url,`${files[index]}.js`))
    res(modules.push(new module()))
  }))
}

Promise.all([...actions])
module.exports = modules;
import { Base } from "./base";

const path = require('path');

let url = path.join(__dirname, 'command')
let files = [ 'gitJump','treeContainer', 'initEnv', 'treeStatusBar']

let testFiles=['dependentest']
files = [...files,...testFiles]

let modules: any[] = []
let actions: Promise<any>[] = []
for (let index = 0; index < files.length; index++) {
  actions.push(new Promise((res, rej) => {
    try{
      let module = require(path.join(url,`${files[index]}.js`))
      res(modules[index] = new module())
    }catch(err){
      Base.tip(err)
    }
  }))
}

Promise.all([...actions])
module.exports = modules;
import { Base } from "./base";

const path = require('path');
let url = path.join(__dirname, 'command')
const files = Base.getAllFilesOfDir(url);

let modules: any[] = []
let actions: Promise<any>[] = []
for (let index = 0; index < files.length; index++) {
  actions.push(new Promise((res, rej) => {
    let module = require(`${files[index]}`)
      res(modules[index] = new module())
  }))
}

Promise.all([...actions])
module.exports = modules;
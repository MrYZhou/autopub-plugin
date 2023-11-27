
import { Base } from './base'

const fs = require('fs');
const path = require('path');
const config = require('./config')
function getFiles(dir: any) {
  let files: any[] = [];
  fs.readdirSync(dir).forEach((file: any) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isFile() && !filePath.endsWith('map')) {
      files.push(filePath);
    } else if (fileStat.isDirectory()) {
      files = files.concat(getFiles(filePath));
    }
  });
  return files;
}
let url = path.join(__dirname, 'command')

const files = getFiles(url);

let modules: any[] = []
let actions: Promise<any>[] = []
for (let index = 0; index < files.length; index++) {
  actions.push(new Promise((res, rej) => {
    const moduleName = files[index];
    let module = require(config.test ? `${moduleName}` : './command')
    res(modules.push(new module()))
  }))
}

Promise.all([...actions])
module.exports = modules;
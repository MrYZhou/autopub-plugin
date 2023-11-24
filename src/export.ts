
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
files.forEach(moduleName => {
  try {
    Base.time('导入模块1');
    let module = require(config.test ? `${moduleName}` : './command')
    modules.push(new module());
    Base.timeEnd('导入模块1');
  } catch (error) {
    console.log('err', error);
  }
})
module.exports = modules;
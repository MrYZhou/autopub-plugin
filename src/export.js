const fs = require('fs');
const path = require('path');
const config = require('./config')
function getFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isFile()) {
      files.push(filePath);
    } else if (fileStat.isDirectory()) {
      files = files.concat(getFiles(filePath));
    }
  });
  return files;
}

const files = getFiles(config.url);
let modules = []
let test = true
files.forEach(moduleName => {
  let module = require(test ? `${moduleName}` : './command')
  modules.push(new module());
})
module.exports = modules;
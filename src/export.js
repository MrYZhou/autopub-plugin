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
let url = path.join(__dirname, 'command')
const files = getFiles(url);
let modules = []
files.forEach(moduleName => {
  let module = require(config.test ? `${moduleName}` : './command')
  modules.push(new module());
})
module.exports = modules;
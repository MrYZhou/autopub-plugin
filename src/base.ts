
const config = require('./config')

const path = require('path')
const os = require('os')
const fs = require('fs')

export class Base {
  
  static sourceDir: string = path.resolve(__dirname, '..', '..', '..', 'environment')
  static targetDir: string = path.resolve(os.homedir(), '.autopub')

  static init() {
    this.createLogFile()
  }

  static createLogFile() {
    if (!fs.existsSync(this.targetDir)) {
      Base.createFile(this.targetDir)
    }
  }
  static createFile(path: string) {
  }
  
  static readFile(path: string) {
    const data = fs.readFileSync(path, 'UTF-8').toString()
    return JSON.parse(data)
  }
  static getAllFilesOfDir(dir: any) {
    let files: any[] = [];
    fs.readdirSync(dir).forEach((file: any) => {
      const filePath = path.join(dir, file);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isFile() && !filePath.endsWith('map')) {
        files.push(filePath);
      } else if (fileStat.isDirectory()) {
        files = files.concat(Base.getAllFilesOfDir(filePath));
      }
    });
    return files;
  }
  static time(label: string) {
    if (config.test) {
      console.time(label)
    }
  }

  static timeEnd(label: string) {
    if (config.test) {
      console.timeEnd(label)
    }
  }

  static tip(msg: any) {
    if (config.test) {
      console.log(msg);
    }
  }

}

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
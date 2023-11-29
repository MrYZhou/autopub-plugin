const fs = require('fs')
const path = require('path')
let config = {
  test: false
}
if(fs.existsSync(path.join(__dirname,'./env.js'))){
  let env = require('./env')
  config = {...config,...env}
}

export = config
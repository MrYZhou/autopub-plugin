

import { Base } from "./base";
Base.time('模块加载')
const modules = require('./export')
Base.timeEnd('模块加载')
module.exports = {
  activate:(context:any) => modules.forEach((module: any) => module.registe(context)),
  deactivate:modules.forEach((module: any) => module.unload())
};
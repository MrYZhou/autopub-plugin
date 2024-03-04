import * as vscode from 'vscode';
import { Base } from "../base";
import { log } from 'console';
module.exports = class TreeStatusBar {
  registe(context: any) {
    Base.tip('环境初始化'+context)
    
    Base.init()

    // 测试代码写下面
    // Base.writeLog(process.env.NODE_ENV+'')
  }
  deactivate() {
  }
}
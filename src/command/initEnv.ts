import * as vscode from 'vscode';
import { Base } from "../base";
module.exports = class TreeStatusBar {
  registe(context: any) {
    Base.tip('环境初始化')
    Base.init()

    // 测试代码写下面
    // Base.writeLog(process.env.NODE_ENV+'')
  }
  deactivate() {
  }
}
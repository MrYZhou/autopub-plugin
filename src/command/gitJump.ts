import * as vscode from 'vscode';
import { Base } from "../base";
module.exports = class TreeStatusBar {
  registe(context: any) {
    Base.tip('github仓库跳转')
    // 创建一个活动栏按钮,点击后跳到部署控制台
  }
  unload(){
    Base.tip('注销git jump')
  }
}
import * as vscode from 'vscode';
import { Base } from "../base";
module.exports = class TreeStatusBar {
  registe(context: any) {
    Base.tip('树视图注册2')
    // 创建一个活动栏按钮,点击后跳到部署控制台
    const myButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    myButton.text = "$(star) AutoPub Panel";
    myButton.tooltip = "Click to show AutoPub Panel";
    myButton.command = "autopub.showPubPanel";
    myButton.show();
    const disposable = vscode.commands.registerCommand('autopub.showPubPanel', () => {
      console.log('部署控制台面板');
    });
    context.subscriptions.push(myButton, disposable);



  }
  deactivate(){
    Base.tip('清理树视图2')
  }
}
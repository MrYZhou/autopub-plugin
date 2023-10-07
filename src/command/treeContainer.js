const vscode = require('vscode');
const Base = require('../base');
module.exports = class treeConTainer extends Base{
  registe(context) {
    super.tip('树视图注册')
    // 创建一个活动栏按钮,点击后跳到部署控制台
    const myButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    myButton.text = "$(star) AutoPub Panel";
    myButton.tooltip = "Click to show AutoPub Panel";
    myButton.command = "myExtension.myCommand";
    myButton.show();
    // 注册命令
    const disposable = vscode.commands.registerCommand('myExtension.myCommand', () => {
      // 执行相应的命令逻辑
    });

    // 将命令和按钮注册到上下文中，以便在插件被停用时进行清理
    context.subscriptions.push(myButton, disposable);
  }
  unload(){
    super.tip('清理树视图')
  }
}
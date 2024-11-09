import * as vscode from 'vscode';
import { Base } from "../util/tool";
import * as path from 'path';
const fs = require('fs')
module.exports = class chatPanel {
  registe(context: any) {
    // 显示按钮
    const myButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    myButton.tooltip = "Open Chat";
    myButton.text = `$(github)`
    myButton.color = 'white';
    myButton.command = 'autopub.chatPanel';
    myButton.show();
    

    let chatPanel = vscode.commands.registerCommand('autopub.chatPanel', async () => {
      try {
        
      } catch (error) {
        Base.tip(error);
      }
    });

    // 将命令注册到插件上下文中，以便在插件停用时自动注销
    /**
     * Registering commands in the plugin context 
     * for automatic logout when the plugin is disabled
     */
    context.subscriptions.push(chatPanel);

  }
  deactivate(context: any) {
    Base.tip('注销git jump'+context)
  }
}
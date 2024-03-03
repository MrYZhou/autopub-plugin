import * as vscode from 'vscode';
import { Base } from "../base";
import path from 'path';
import fs from "fs"
module.exports = class Webview {
  registe(context: any) {
    // 创建一个新的 WebView 视图
    const panel = vscode.window.createWebviewPanel('myWebView', '添加主机',
      vscode.ViewColumn.One,
      { enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'dist', 'app')),
        ],
      }
    );

    // 注册消息监听器来接收来自webview的消息
    panel.webview.onDidReceiveMessage(message => {
      
      // 处理来自表单的数据
      if (message.type === 'form-data') {
        
        console.log('Received form data:', message.data);
        // 这里实现将数据存储到数据库或其他操作
      }
    });

    // 在 WebView 视图中加载 HTML 内容
    panel.webview.html = getWebviewHTML(context.extensionUri)

    // webview销毁函数
    panel.onDidDispose(() => {
      console.log('panel onDidDispose')
    })

  }
  deactivate() {
  }
}

function getWebviewHTML(extensionUri: vscode.Uri): string {
  const htmlPathOnDisk = vscode.Uri.joinPath(
    extensionUri,
    'dist',
    'app',
    'index.html'
  );
  return fs.readFileSync(htmlPathOnDisk.fsPath, 'utf8');
}

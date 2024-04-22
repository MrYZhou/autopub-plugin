import * as vscode from 'vscode';
import { Base } from "../base";
import { Uri } from 'vscode';

const path = require('path');
const fs = require('fs');
module.exports = class Webview {
  registe(context: vscode.ExtensionContext) {
    let extensionUri = vscode.extensions.getExtension('larry.autopub')?.extensionUri;
    console.log(extensionUri, '地址');

    let openHostAdd = vscode.commands.registerCommand('autopub.host.add', async () => {
      // 创建一个新的 WebView 视图
      const panel = vscode.window.createWebviewPanel('myWebView', '添加主机',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'out/view')),
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
      panel.webview.html = getWebviewHTML(panel, extensionUri ?? Uri.file(''));

      // webview销毁函数
      panel.onDidDispose(() => {
        console.log('panel onDidDispose')
      })
    })
    context.subscriptions.push(openHostAdd);


  }
  deactivate() {
  }
}

function getWebviewHTML(panel: vscode.WebviewPanel, extensionUri: Uri): string {
  // TODO 获取随机文件名
  // js地址动态转换
  const scriptUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'out', 'view', 'assets', 'index-d36c2de6.js')
  );

  // css地址动态转换
  const styleUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'out', 'view', 'assets', 'index-70d3a69b.css')
  );


  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <base target="_top" href="/"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- don't remove !! __webview_public_path__ -->
      <script type="module" crossorigin src="${scriptUri}"></script>
      <link rel="stylesheet" href="${styleUri}">
    </head>
    <body>
      <div id="app"></div>
      
    </body>
  </html>
  `;
}

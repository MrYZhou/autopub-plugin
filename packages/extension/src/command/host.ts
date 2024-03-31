import * as vscode from 'vscode';
import { Base } from "../base";

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
      panel.webview.html = getWebviewHTML(panel, context);

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

function getWebviewHTML(panel: vscode.WebviewView | vscode.WebviewPanel, context: vscode.ExtensionContext): string {
  const styleUri = panel.webview.asWebviewUri(vscode.Uri.file(
    path.join(context.extensionPath, 'out', 'view', 'assets', 'index-70d3a69b.css')
  ));
  const scriptUri = panel.webview.asWebviewUri(vscode.Uri.file(
    path.join(context.extensionPath, 'out', 'view', 'assets', 'index-d36c2de6.js')
  ));
  const entryHtmlPath = vscode.Uri.file(
    path.join(context.extensionPath, 'out', 'view', 'index.html')
  ); // 假设清单文件中 'main.html' 是入口文件的键

  const entryHtmlUri = 'https://www.';

  let html = `<iframe src="${entryHtmlUri}" frameborder="0" style="width: 100%; height: 100%;"></iframe>`
  // return html;
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${styleUri}">
      </head>
      <body>
        1213
        <script src="${scriptUri}"></script>
      </body>
    </html>
  `;
}

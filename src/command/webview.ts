import * as vscode from 'vscode';
import { Base } from "../base";
import { WebviewPanel } from 'vscode';

module.exports = class Webview {
  registe(context: any) {
    // vscode新建一个webview视图
    // 创建一个新的 WebView 视图
    const webViewPanel = vscode.window.createWebviewPanel('myWebView', 'My Web View', vscode.ViewColumn.One, {
      enableScripts: true
    });

    // 发送消息到 WebView 视图
    webViewPanel.webview.postMessage({ message: 'Hello from the extension' });

    // 在 WebView 视图中加载 HTML 内容
    webViewPanel.webview.html = `
      <html>
          <head>
              <script>
                  window.addEventListener('message', function (event) {
                      console.log('Received message from the extension: ', event);
                  });
              </script>
          </head>
          <body>
              <h1>Hello World!</h1>
          </body>
      </html>
    `;



  }
  deactivate() {
  }
}
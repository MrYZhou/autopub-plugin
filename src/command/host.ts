import * as vscode from 'vscode';
import { Base } from "../base";

module.exports = class Webview {
  registe(context: any) {
    // vscode新建一个webview视图
    // 创建一个新的 WebView 视图
    const panel = vscode.window.createWebviewPanel('myWebView', '添加主机',
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    // 注册消息监听器来接收来自webview的消息
    panel.webview.onDidReceiveMessage(message => {
      console.log(1111);

      if (message.type === 'form-data') {
        handleFormData(message.data); // 处理来自表单的数据
      }
    });

    // 在 WebView 视图中加载 HTML 内容
    panel.webview.html = getWebviewHTML(context.extensionUri)

    // 向webview注入JavaScript接口
    // const scriptPathOnDisk = vscode.Uri.joinPath(context.extensionUri, 'path/to/your/script.js');
    // const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
    // panel.webview.html += `<script src="${scriptUri}"></script>`;

    // webview销毁函数
    panel.onDidDispose(() => {
      console.log('panel onDidDispose')
    })

  }
  deactivate() {
  }
}
function handleFormData(formData: any) {
  console.log('Received form data:', formData);
  // 这里实现将数据存储到数据库或其他操作
}
function getWebviewHTML(extensionUri: vscode.Uri): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Form</title>
    <script>
     
    </script>
  </head>
  <body>

  111
  <iframe width="400px" height="400px" :src="http://172.23.0.1:3000" frameborder="0"></iframe>

  </body>
  </html>
  `
}
function getWebviewHTML2(extensionUri: vscode.Uri): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Form</title>
    <script>
      // 定义获取表单数据并发送消息的方法
      function submitForm() {
        const formData = {
          hostname: document.getElementById('hostname').value,
          hostip: document.getElementById('hostip').value,
          port: document.getElementById('port').value,
          username: document.getElementById('username').value,
          password: document.getElementById('password').value,
          key: document.getElementById('key').value,
        };
  
        // 发送包含表单数据的消息给VSCode插件
        window.postMessage({ type: 'form-data', data: formData }, '*');
      }
    </script>
  </head>
  <body>
    <div>
    
  <a href="https://www.baidu.com/">111</a>
      <p>主机名：<input type="text" id="hostname" value=""/></p>
      <p>主机IP：<input type="text" id="hostip" value=""/></p>
      <p>端口：<input type="text" id="port" value=""/></p>
      <p>登录用户：<input type="text" id="username" value=""/></p>
      <p>密码：<input type="password" id="password" value=""/></p>
      <p>密钥：<input type="text" id="key" value=""/></p>
    </div>
    <button onclick="submitForm()">提交1</button>
  </body>
  </html>
`;
}

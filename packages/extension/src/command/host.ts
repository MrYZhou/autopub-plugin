import * as vscode from 'vscode';
import { Base } from "../util/tool";
import { Uri } from 'vscode';
import axios from 'axios';
const path = require('path');
const fs = require('fs');
module.exports = class Webview {
    registe(context: vscode.ExtensionContext) {
        let extensionUri = vscode.extensions.getExtension('larry.autopub')?.extensionUri;
        let panel: vscode.WebviewPanel
        let openHostAdd = vscode.commands.registerCommand('autopub.host.add', async () => {
        // 创建一个新的 WebView 视图
            panel = vscode.window.createWebviewPanel('myWebView', '添加主机',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    localResourceRoots: [
                        vscode.Uri.file(path.join(context.extensionPath, 'out/view')),
                    ],
                }
            );

            // 注册消息监听器来接收来自webview的消息
            panel.webview.onDidReceiveMessage(async event => {

                // 处理来自表单的数据
                if (event.type === 'hostAdd') {

                    console.log('Received form data:', event.data);
                    const response = await axios.get('http://127.0.0.1:8083');
                    console.log(response);

                    // 这里实现将数据存储到数据库或其他操作
                }
            });

            // 在 WebView 视图中加载 HTML 内容
            panel.webview.html = await getWebviewHTML(panel, extensionUri ?? Uri.file(''));

            // webview销毁函数
            panel.onDidDispose(() => {
                console.log('panel onDidDispose')
            })

            panel.webview.postMessage({ type: 'hostAdd1', data: 'hostAdd' });


        })
        context.subscriptions.push(openHostAdd);


    }
    deactivate() {
    }
}
// 获取目录下文件信息
async function listFilesInDirectory(uri: vscode.Uri): Promise<any> {
    try {
        // 使用vscode.workspace.fs.readDirectory来获取目录内容
        const entries = await vscode.workspace.fs.readDirectory(uri) as any;

        let map = {} as any
        entries.map((entry: string[]) => {
            if (entry[0].includes('css')) {
                map['css'] = vscode.Uri.joinPath(uri, entry[0])
            }
            if (entry[0].includes('js')) {
                map['js'] = vscode.Uri.joinPath(uri, entry[0])
            }
        });

        return map;
    } catch (error) {
        console.error(`Failed to read directory: ${error}`);
        return [];
    }
}

async function getWebviewHTML(panel: vscode.WebviewPanel, extensionUri: Uri): Promise<string> {
    let res = await listFilesInDirectory(vscode.Uri.joinPath(extensionUri, 'out', 'view', 'assets'))
    // js地址动态转换
    const scriptUri = panel.webview.asWebviewUri(res['js']);
    // css地址动态转换
    const styleUri = panel.webview.asWebviewUri(res['css']);

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

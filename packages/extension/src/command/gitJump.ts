import * as vscode from 'vscode';
import { Base } from "../util/tool";
import { simpleGit } from 'simple-git';
import * as path from 'path';
const fs = require('fs')
module.exports = class TreeStatusBar {
  registe(context: any) {
    Base.tip('github仓库跳转')
    // 显示按钮
    const myButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    myButton.tooltip = "Open RemoteRepository";
    myButton.text = `$(github)`
    myButton.color = 'white';
    myButton.command = 'autopub.openRepository';
    myButton.show();
    
    let openRepository = vscode.commands.registerCommand('autopub.openRepository', async () => {
      try {
        let uri = vscode.workspace.workspaceFolders?.[0].uri.fsPath as string
        let filePath = path.join(uri, '.git/index')
        let isExit = fs.existsSync(filePath);
        if (!isExit) {
          vscode.window.showErrorMessage('Not a git repository');
          return;
        }
        const getGitRepositoryUrl = (filePath: string) => {
          return new Promise(async (res) => {
            const git = simpleGit(path.dirname(filePath));
            const remotes = await git.getRemotes(true);
            const gitRepoUrl = remotes.filter((remote: { name: string; }) => remote.name === 'origin')[0].refs.fetch;
            res(gitRepoUrl);
          })
        }
        const gitRepoUrl = await getGitRepositoryUrl(filePath) as string;
        const externalUri = await vscode.env.asExternalUri(vscode.Uri.parse(gitRepoUrl));
        vscode.env.openExternal(externalUri);

      } catch (error) {
        Base.tip(error);
      }
    });

    // 将命令注册到插件上下文中，以便在插件停用时自动注销
    /**
     * Registering commands in the plugin context 
     * for automatic logout when the plugin is disabled
     */
    context.subscriptions.push(openRepository);

  }
  deactivate(context: any) {
    Base.tip('注销git jump'+context)
  }
}
import * as vscode from 'vscode';
import { Base } from "../base";
import { simpleGit } from 'simple-git';
import * as path from 'path';

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
        const editor = vscode.window.activeTextEditor;
        const filePath = editor?.document.uri.fsPath;

        if (!filePath) {
          vscode.window.showErrorMessage('No file is opened in the editor!');
          return;
        }
        const getGitRepositoryUrl = (filePath: string) => {
          return new Promise(async (res, rej) => {
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
  deactivate() {
    Base.tip('注销git jump')
  }
}
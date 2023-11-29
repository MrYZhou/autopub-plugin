import * as vscode from 'vscode';
const simpleGit = require('simple-git');
const path = require('path');
import { Base } from "../base";
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


    let openRepository = vscode.commands.registerCommand('autopub.openRepository', async function () {
      const editor = vscode.window.activeTextEditor;
      const filePath = editor?.document.uri.fsPath;

      if (!filePath) {
        vscode.window.showErrorMessage('No file is opened in the editor!');
        return;
      }
      const getGitRepositoryUrl = async (filePath: string) => {
        try {
          const git = simpleGit(path.dirname(filePath));
          const remotes = await git.getRemotes(true);
          const gitRepoUrl = remotes.filter((remote: { name: string; }) => remote.name === 'origin')[0].refs.fetch;
          return gitRepoUrl;
        } catch (error) {
          console.error(error);
          return null;
        }
      }

      const gitRepoUrl = await getGitRepositoryUrl(filePath);

      const externalUri = await vscode.env.asExternalUri(vscode.Uri.parse(gitRepoUrl));
      vscode.env.openExternal(externalUri);

    });

    // 将命令注册到插件上下文中，以便在插件停用时自动注销
    /**
     * Registering commands in the plugin context 
     * for automatic logout when the plugin is disabled
     */
    context.subscriptions.push(openRepository);

  }
  unload(){
    Base.tip('注销git jump')
  }
}
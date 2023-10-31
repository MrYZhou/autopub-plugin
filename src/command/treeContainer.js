const vscode = require('vscode');
const Base = require('../base');
module.exports = class TreeConTainer extends Base {
  registe(context) {
    const rootPath =
      vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;
    // 项目信息数据初始化
    let projectData = new ProjectDataProvider(rootPath)
    vscode.window.registerTreeDataProvider(
      'project', projectData
    );
    vscode.commands.registerCommand('myExtension.refreshData', () =>
      projectData.refresh()
    );
  }
  unload() {
    super.tip('清理树视图')
  }
}
class ProjectDataProvider {
  // vscode约定方法,名字不可改
  getTreeItem(element) {

  }
  // vscode约定方法,名字不可改
  getChildren(element) {

  }
  // 额外的自定义方法,名称可随意
  refresh() {

  }
}
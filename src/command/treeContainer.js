const vscode = require('vscode');
const Base = require('../base');
import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, ProviderResult, window } from "vscode";
module.exports = class TreeConTainer extends Base  {
  registe(context) {

    // 项目信息数据初始化
    let projectData = new ProjectDataProvider()
    vscode.window.registerTreeDataProvider(
      'project', projectData
    );
    vscode.commands.registerCommand('autopub.refreshData', () => {
      vscode.window.showInformationMessage("open dir:")
      // projectData.refresh()
    });
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
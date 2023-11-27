
import * as vscode from 'vscode';
import { Base } from "../base";
import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, ProviderResult, window  } from "vscode";
module.exports = class TreeConTainer {
  registe(context: any) {
    Base.tip('树视图注册')
    // 项目信息数据初始化
    let projectData = new ProjectDataProvider()
    vscode.window.registerTreeDataProvider(
      'project', projectData
    );
    vscode.commands.registerCommand('autopub.refreshData', () => {
      vscode.window.showInformationMessage("open dir:")
      projectData.refresh()
    });
  }
  unload() {
    Base.tip('清理树视图')
  }
}
class ProjectDataProvider implements TreeDataProvider<any>{
  // vscode约定方法,名字不可改
  getTreeItem(element: any) : TreeItem  {
    return new TreeItem('aa')
  }
  // vscode约定方法,名字不可改
  getChildren(element: any) :ProviderResult<any[]>{
    return [new DateResult()]
  }
  // 额外的自定义方法,名称可随意
  refresh() {

  }
}
class DateResult implements ProviderResult<any>{

}
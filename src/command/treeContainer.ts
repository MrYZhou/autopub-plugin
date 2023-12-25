
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
    const refreshData = vscode.commands.registerCommand('autopub.refreshData', () => {
      vscode.window.showInformationMessage("refresh data...")
      projectData.refresh()
    });

    context.subscriptions.push(refreshData);
    context.subscriptions.push(projectData);
    

    // let dockerData = new ProjectDataProvider()
    // vscode.window.registerTreeDataProvider(
    //   'docker', dockerData
    // );

    
  }
  deactivate() {
    Base.tip('清理树视图')
  }
}
class ProjectDataProvider implements vscode.TreeDataProvider<any>{
  private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

  // vscode约定方法,名字不可改
  getTreeItem(element: DataModel): TreeItem {
    console.log(element);
    let treeItem=new TreeItem({label:`${element.label}`})
    return treeItem
  }
  // vscode约定方法,名字不可改
  getChildren(element: DataModel): ProviderResult<any[]> {
    let children
    console.log(element);
    if (!element) {
      children = new DateResult().get()
    }
    return children
  }
  // 额外的自定义方法,名称可随意
  refresh() :void{
    this._onDidChangeTreeData.fire(undefined);
  }
}
class DataModel {
  /**
   * 显示标题
   */
  label!: string
  /**
   * git仓库地址
   */
  gitUrl!: string
  /**
   * 类型标识。可选（folder,project）
   * 
   * folder 项目分类目录。如crm后台管理（工程）
   * 
   * project 具体项目。如crm java后端. crm web前端,crm h5端
   */
  type!: string
  /**
   * 子项目
   */
  children!: DataModel[];
}
/**
 * 数据集
 */
class DateResult implements ProviderResult<any>{
  get() {
    let a = new DataModel();
    let b = new DataModel();
    a.label = '测试项目'
    a.type = 'folder'

    b.label = 'web2'
    b.children = []

    a.children = [b]
    return [
      a, b
    ]
  }
}
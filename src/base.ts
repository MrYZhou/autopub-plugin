

import { simpleGit } from 'simple-git';
import * as path from 'path';
import * as config from "./config";
export class Base {
  static getGitRepositoryUrl = (filePath: string) => {
    return new Promise(async (res, rej) => {
      try {
        const git = simpleGit(path.dirname(filePath));
        const remotes = await git.getRemotes(true);
        const gitRepoUrl = remotes.filter((remote: { name: string; }) => remote.name === 'origin')[0].refs.fetch;
        res(gitRepoUrl);
      } catch (error) {
        Base.tip(error);
        rej(error);
      }
    })
  }
  static time(label: string) {
    if(config.test){
      console.time(label)
    }
  }

  static timeEnd(label: string) {
    if(config.test){
      console.timeEnd(label)
    }
  }
 
  static tip(msg: any) {
    if(config.test){
      console.log(msg);
    }
  }
  
}
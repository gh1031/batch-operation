import fs from 'fs-extra';
import path from 'path';
import { throwError, isHiddenFile } from '.';

/**
 * @description get sub directory of current work directory 
 * @param cwd a path
 */
function readDir(cwd: fs.PathLike): string[] {
  try {
    if (fs.existsSync(cwd)) {
      return fs.readdirSync(cwd);
    }
  } catch (error) {
    throwError(error);
  }
}

/**
 * @description check the folder is directory
 * @param currentDir a folder to check
 * @param cwd the current work directory
 */
export function isDirectory(currentDir: string, cwd: string) {
  return fs.lstatSync(path.join(cwd, currentDir)).isDirectory();
}

/**
 * @description get sub directory of crurent work directory
 * @param cwd current work directory
 */
export function getDirs(cwd: string): string[] {
  return readDir(cwd).filter(dir => isDirectory(dir, cwd));
}

/**
 * 
 * @param cwd get sub directory or files of current work directory
 * @param includeHiddenFile whether to include hidden file
 */
export function getDirsAndFiles(cwd: fs.PathLike, includeHiddenFile: boolean = true) {
  if (includeHiddenFile) {
    return readDir(cwd);
  } else {
    return readDir(cwd).filter(item => !isHiddenFile(item));
  }
}

/**
 * 
 * @param target get the absoulte path of work directory
 */
export function getAbsoulteWorkDir(target: string) {
  if (!target) {
    throwError(`workDir is not provide!`);
  }
  if (path.isAbsolute(target)) {
    return target;
  }
  return path.resolve(process.cwd(), target);
}

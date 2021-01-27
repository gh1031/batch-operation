import fs from 'fs-extra';
import path from 'path';
import commander from 'commander';
import {
  isExist,
  isHiddenFile,
} from './utils/index';
import { execSync } from './utils/exec';
import logger from './utils/logger';
import { getDirs, getAbsoulteWorkDir } from './utils/dir';


/**
 * handle unhandled rejection
 */
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`'[Unhandled Rejection]:${JSON.stringify(promise)}, reason: ${reason}`);
  process.exit(1);
})


async function updateDir(targetDirs: string[], options, remove?: boolean) {
  const workDir = getAbsoulteWorkDir(options.workDir);
  const allDirs = getDirs(workDir);
  
  for (let i = 0; i < allDirs.length; i++) {

    try {
      for (let j = 0; j < targetDirs.length; j++) {
        const absolutePath = path.join(workDir, allDirs[i], targetDirs[j]);

        if (remove) {
          if (await isExist(absolutePath)) {
            fs.remove(absolutePath)
              .then(() => {
                logger.log(`[remove dir]: ${targetDirs[j]} was removed! `)
              })
              .catch(error => {
                logger.error(`[remove dir]: ${error} `)
              })
          } else {
            logger.warning(`[remove dir]: ${targetDirs[j]} 文件夹不存在！`)
            continue;
          }
        } else {
          logger.log(`${targetDirs[j]} is creating...`);
          fs.mkdir(absolutePath);
        }
      }
    } catch(e) {
      logger.error(`[update dir]: The error occurred in ${path.join(workDir, allDirs[i])}: ${e}`)
    }
  }
}
/**
 * addition of folders
 */
export function batchMkdir(program: commander.Command): void {
  program
    .command('rmdir <dirs...>')
    .description('delete specified folders or files in batch')
    .option('-w, --work-dir <workDir>', 'a batch folder')
    .action((targetDirs: string[], options) => {
      updateDir(targetDirs, options, true);
    })
}
/**
 * deletion of folders
 */
export function batchRmdir(program: commander.Command): void {
  program
    .command('mkdir <dirs...>')
    .description('create specified folders in batch')
    .option('-w, --work-dir <workDir>', 'a batch folder')
    .action((targetDirs: string[], options) => {
      updateDir(targetDirs, options);
    })
}

function execCmd(cmds: string[], options) {
  const workDir = getAbsoulteWorkDir(options.workDir);
  const allDirs = getDirs(workDir);
  const cmd = cmds.join(' ');

  for (let i = 0; i < allDirs.length; i++) {
    if (isHiddenFile(allDirs[i])) continue;
    const currentWorkPath = path.join(workDir, allDirs[i]);

    process.chdir(currentWorkPath)
    
    try {
      logger.log(`[exec]: ${cmd} in ${currentWorkPath}...`);
      execSync(cmd);
    } catch(e) {
      logger.error(`[exec]: The error: ${e} occurred in: ${currentWorkPath}`);
    }
  }
}
/**
 * exec shell in batches in the working directory
 */
export function batchExec(program: commander.Command): void {
  program
    .command('exec <cmds...>')
    .description('exec shell in batch')
    .action((cmds, options) => {
      execCmd(cmds, options);
    })
}

/**
 * compress directory
 */
export function batchCompress(program: commander.Command): void {
  program
    .command('compress')
    .description('compress dir in batch')
    .option('-w, --work-dir <workDir>', 'a batch folder')
    .action((options) => {
      const workDir = getAbsoulteWorkDir(options.workDir);
      process.chdir(workDir);

      const allDirs = getDirs(workDir);
      allDirs.forEach(dir => {
        const currentDir = path.join(workDir, dir);
        try {
          logger.log(`${currentDir} is compressing...`)
          execSync(`tar -czv -f ${path.join(workDir, `${dir}.tar.gz`)} ${currentDir}`)
        } catch (e) {
          logger.error(`[compress]: error in ${currentDir}`)
        }
      })

    })
}

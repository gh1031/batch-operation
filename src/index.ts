import fs from 'fs';
import path from 'path';
import commander from 'commander';
import cp from 'child_process';
import logger from './utils/logger';
import {
  getDirs,
  getAbsoultePath,
  isHiddenFile
} from './utils/dir';
import { exception } from 'console';


/**
 * handle unhandled rejection
 */
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`'[Unhandled Rejection]:${JSON.stringify(promise)}, reason: ${reason}`);
  process.exit(1);
})


async function updateDir(targetDirs: string[], options, remove?: boolean) {
  const workDir = getAbsoultePath(options.workDir);
  const allDirs = getDirs(workDir);
  const asynchronous = options.async;
  
  for (let i = 0, ln = allDirs.length; i < ln; i++) {

    try {
      for (let j = 0; j < targetDirs.length; j++) {
        const absolutePath = path.join(workDir, allDirs[i], targetDirs[j]);

        if (remove) {
          if (fs.existsSync(absolutePath)) {
            
            try {
              if (asynchronous) {
                fs.rmdir(absolutePath, { recursive: true }, (exception) => {
                  if (exception) throw exception;
                  logger.log(`[remove dir]: ${absolutePath} was removed! `);
                })
              } else {
                fs.rmdirSync(absolutePath);
                logger.log(`[remove dir]: ${absolutePath} was removed! `);
              }
            } catch (exception) {
              logger.error(`[remove dir]: ${exception}`)
            }

          } else {
            logger.warning(`[remove dir]: ${absolutePath} is not exist`);
            continue;
          }
        } else {

          try {
            if (asynchronous) {
              fs.mkdir(absolutePath, (exception) => {
                if (exception) throw exception;
                logger.log(`[mkdir]: ${absolutePath} created`);
              });
            } else {
              fs.mkdirSync(absolutePath);
              logger.log(`[mkdir]: ${absolutePath} created`);
            }
          } catch (exception) {
            logger.error(`[mkdir]: ${exception}`);
          }

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
    .requiredOption('-w, --work-dir <workDir>', 'a folder to be process in bulk')
    .option('-a, --async', 'asynchronous task')
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
    .requiredOption('-w, --work-dir <workDir>', 'a folder to be process in bulk')
    .option('-a, --async', 'asynchronous task')
    .action((targetDirs: string[], options) => {
      updateDir(targetDirs, options);
    })
}

function execCmd(cmds: string[], options) {
  const workDir = getAbsoultePath(options.workDir);
  const asynchronous = options.async;
  const allDirs = getDirs(workDir);
  const cmd = cmds.join(' ');

  for (let i = 0; i < allDirs.length; i++) {
    if (isHiddenFile(allDirs[i])) continue;
    const currentWorkPath = path.join(workDir, allDirs[i]);

    try {
      logger.log(`[exec]: do "${cmd}" in ${currentWorkPath}...`);
      if (asynchronous) {
        cp.exec(
          cmd, { cwd: currentWorkPath },
          (exception, stdout) => {
            if (exception) throw exception;
            console.log(stdout)
          }
        );
      } else {
        cp.execSync(cmd, { cwd: currentWorkPath, stdio: "inherit", });
      }
    } catch(exception) {
      logger.error(`[exec]: The error: ${exception} occurred in: ${currentWorkPath}`);
    }

  }
}
/**
 * exec shell in batches in the working directory
 */
export function batchExec(program: commander.Command): void {
  program
    .command('exec <cmds...>')
    .alias('ex')
    .description('exec shell in batch')
    .requiredOption('-w, --work-dir <workDir>', 'a folder to be process in bulk')
    .option('-a, --async', 'asynchronous shell execution')
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
    .requiredOption('-w, --work-dir <workDir>', 'a folder to be process in bulk')
    .option('-a, --async', 'asynchronous compress')
    .action((options) => {
      const workDir = getAbsoultePath(options.workDir);
      const allDirs = getDirs(workDir);
      const asynchronous = options.async;

      allDirs.forEach(dir => {
        const currentDir = path.join(workDir, dir);
        try {
          logger.log(`${currentDir} is compressing...`);
          const cmd = (`tar -czv -f ${path.join(workDir, `${dir}.tar.gz`)} ${currentDir}`);
          if (asynchronous) {
            cp.exec(cmd, { cwd: workDir }, (exception, stdout) => {
              if (exception) throw exception;
              console.log(stdout);
            });
          } else {
            cp.execSync(cmd, { cwd: workDir });
          }
        } catch (e) {
          logger.error(`[compress]: error in ${currentDir}`)
        }

      })

    })
}

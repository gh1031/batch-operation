import fs from 'fs-extra';
import logger from './logger';

/**
 * 
 * @param errorMsg 错误信息
 */
export const throwError = (errorMsg: string): Error => {
  throw new Error(`
    ${logger.error(errorMsg)}
    ${logger.error('more help to see \`bo --help\`')}
  `)
};

/**
 * 
 * @param path check the file or directory is exist
 */
export const isExist = (path: string): Promise<fs.Stats | boolean> => {
  return new Promise((resolve) => {
    fs.stat(path, (err, stat: fs.Stats) => {
      return err ? resolve(false) : resolve(stat)
    })
  })
}

/**
 * 
 * @param path check the file is hiddened
 */
export const isHiddenFile = (path: string): boolean => {
  return path.startsWith('.')
}

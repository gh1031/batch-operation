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

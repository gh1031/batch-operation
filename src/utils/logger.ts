import chalk, { BackgroundColor, ForegroundColor } from 'chalk';

const log = console.log;

type FGColor = typeof ForegroundColor;
type BGColor = typeof BackgroundColor;

class Logger {
  doLog(msg: string,  fgColor: FGColor = 'green', bgColor?: BGColor) {
    if (bgColor) {
      return log(chalk[fgColor][bgColor](msg));
    }
    log(chalk[fgColor](msg))
  }

  log(msg: string, fgColor: FGColor = 'green', bgColor?: BGColor) {
    this.doLog(msg, fgColor, bgColor);
  }

  warning(msg: string, fgColor: FGColor = 'yellow', bgColor?: BGColor) {
    this.doLog(msg, fgColor, bgColor);
  }

  error(msg: string, fgColor: FGColor = 'red', bgColor?: BGColor) {
    this.doLog(msg, fgColor, bgColor);
  }
}

export default new Logger();

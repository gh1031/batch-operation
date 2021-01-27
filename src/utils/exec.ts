import cp from 'child_process';


const defaultOption: cp.ExecSyncOptions = {
  stdio: 'inherit',
  env: process.env,
}
export function exec(cmd: string, options?: cp.ExecException, cb?: Function) {
  // cp.exec(cmd, options, cb);
}

export function execSync(cmd: string, options?: cp.ExecSyncOptions) {
  let newOptions = defaultOption;
  if (typeof options === 'object') {
    newOptions = Object.assign(defaultOption, options);
  }
  cp.execSync(cmd, newOptions)
}

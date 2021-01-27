import { execSync } from '../utils/exec';

export function installNodeModules() {
  execSync('yarn');
}

import { execSync } from '../utils/exec';

export function deleteDir(dir: string): void {
  execSync(`rm -rf ${dir}`)
}

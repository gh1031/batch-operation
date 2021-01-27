// #!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { Command } from 'commander';
import { batchMkdir, batchRmdir, batchExec, batchCompress } from '../';

const program = new Command();
const pkg = fs.readFileSync(path.join(process.cwd(), 'package.json'), { encoding: 'utf8' })

program
  .version(JSON.parse(pkg).version)
  // .requiredOption('-w, --work-dir <workDir>', 'a batch folder')

  
batchMkdir(program);
batchRmdir(program);
batchExec(program);
batchCompress(program);
  
program.parse(process.argv);

if (process.env.NODE_ENV === 'development') {
  console.log(program.opts())
}

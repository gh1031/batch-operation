#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import { batchMkdir, batchRmdir, batchExec, batchCompress } from '..';

const program = new Command();
const pkg = fs.readFileSync(path.resolve(__dirname, '../../package.json'), { encoding: 'utf8' });

program
  .version(JSON.parse(pkg).version)

  
batchMkdir(program);
batchRmdir(program);
batchExec(program);
batchCompress(program);
  
program.parse(process.argv);

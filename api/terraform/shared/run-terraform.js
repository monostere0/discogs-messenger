#!/usr/bin/env node
/* eslint-disable no-undef, no-console */

const { spawn } = require('child_process');
require('dotenv').config({
  path: __dirname.replace('terraform/shared', '.env')
});

const terraformArg = process.argv[2] || '-help';
const processStream = spawn('terraform', [terraformArg], {
  cwd: __dirname
});

processStream.stdout.on('data', data => console.log(data.toString()));
processStream.stderr.on('data', data => console.log(data.toString()));
processStream.on('exit',
  code => console.log(`run-terraform exited with ${code.toString()}`));

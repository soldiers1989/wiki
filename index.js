const shell = require('shelljs');
const open = require('opn');
/*
if (shell.exec('docsify serve ./docs').code !== 0) {
  open("http://localhost:3000");
}*/
shell.exec('docsify serve ./docs');
open("http://localhost:3000");
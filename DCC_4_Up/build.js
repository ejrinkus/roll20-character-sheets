const pug = require('pug');

const compiledRoot = pug.compileFile('DCC_4_Up.pug');

console.log(compiledRoot({}));
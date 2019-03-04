import program = require('commander');
import URL = require('url');

program
	.usage('[options] <url>')
	.option('-l, --limit <n>', 'Number of times to follow links', parseInt)
	.parse(process.argv)
;

if(program.args.length !== 1) {
	program.outputHelp();
	process.exit(1);
}

const url = program.args[0];

let limit = 2
if(program.limit != null) {
	limit = program.limit
}

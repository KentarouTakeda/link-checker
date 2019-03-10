import program = require('commander');
import { scrape } from "./scraping";
import URL = require('url');

program
	.usage('[options] <url>')
	.option('-l, --limit <n>', 'Number of times to follow links', parseInt)
	.option('-n, --number <n>', 'Number of pages to retrieve', parseInt)
	.option('-w, --wait <n>', 'Wait time to retrieve', parseInt)
	.parse(process.argv)
;

if(program.args.length !== 1) {
	program.outputHelp();
	process.exit(1);
}

const url = program.args[0];

let limit = 2
if(program.limit != null) {
	limit = program.limit;
}

let number = 100;
if(program.number != null) {
	number = program.number;
}

let wait = 100;
if(program.wait != null) {
	wait = program.wait;
}

scrape(url, limit, number, wait, console.warn).then(result => {
	console.log(JSON.stringify(result, null, 1));
});

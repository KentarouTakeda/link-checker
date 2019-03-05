import program = require('commander');
import { scrape } from "./scraping";
import URL = require('url');

program
	.usage('[options] <url>')
	.option('-l, --limit <n>', 'Number of times to follow links', parseInt)
	.option('-n, --number <n>', 'Number of pages to retrieve', parseInt)
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

scrape(url, limit, number, console.warn).then(result => {
	const a = result.map(v => {
		delete v.source;
		delete v.hash;
		return v;
	});

	console.log(JSON.stringify(a, null, 1));
});

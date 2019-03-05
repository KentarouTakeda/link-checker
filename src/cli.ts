import program = require('commander');
import { scrape } from "./scraping";
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

scrape(url, limit, console.warn).then(result => {
	const a = result.map(v => {
		delete v.source;
		delete v.hash;
		return v;
	});

	console.log(JSON.stringify(a, null, 1));
});

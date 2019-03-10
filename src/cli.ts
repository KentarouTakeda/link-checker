import program = require('commander');
import { scrape } from "./scraping";
import { links, summary, MakeWorkBook } from "./output";
import URL = require('url');
import fs = require('fs');
import XLSX = require('xlsx');

if(module.parent == null) {
	program
		.usage('[options] <url>')
		.option('-l, --limit <n>', 'Number of times to follow links (default: 20)', parseInt)
		.option('-n, --number <n>', 'Number of pages to retrieve (default: 10000)', parseInt)
		.option('-w, --wait <n>', 'Wait time(ms) to retrieve (default: 100)', parseInt)
		.option('-o, --out <filename>', 'Filename fo write. by default, determined by domain name', String)
		.parse(process.argv)
	;

	if(program.args.length !== 1) {
		program.outputHelp();
		process.exit(1);
	}

	const url = program.args[0];

	let fileName = getFileNameFromURL(url);
	if(fileName == null) {
		console.log('Invalid URL');
		process.exit();
	}

	if(program.out && typeof program.out === 'string' && program.out.length>0) {
		fileName = program.out;
	}

	let limit = 20;
	if(program.limit != null) {
		limit = program.limit;
	}

	let number = 10000;
	if(program.number != null) {
		number = program.number;
	}

	let wait = 100;
	if(program.wait != null) {
		wait = program.wait;
	}

	scrape(url, limit, number, wait, console.warn).then(result => {
		const book = MakeWorkBook({
			summary: summary(result),
			links: links(result),
		});

		XLSX.writeFile(book, 'out.xlsx');
	});
}

export function getFileNameFromURL(url: string): string|null {
	const parse = URL.parse(url);

	if(parse == null) {
		return null;
	}

	if(['http:','https:'].includes(parse.protocol||'') !== true) {
		return null;
	}

	if(parse == null || parse.hostname == null) {
		return null;
	}

	return `${parse.hostname}.xlsx`;
}

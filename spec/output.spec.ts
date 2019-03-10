import { parse } from '../src/parseLinks';
import { summary, links, MakeWorkbook } from '../src/output';
import XLSX = require('xlsx');

describe('output', ()=>{
	const result: parse[] = require('./google.co.jp.json');

	it('summary', ()=>{
		summary(result).forEach(v => {
			expect(v.length).toBe(4);
			expect(v[0]).toBeDefined();
			expect(v[1]).toBeDefined();
			expect(v[2]).toBeDefined();
			expect(v[3]).toBeDefined();
		});
	});

	it('links', ()=>{
		links(result).forEach(v => {
			expect(v.length).toBe(8);
			v.forEach(c => {
				expect(c).toBeDefined();
				expect(c).toEqual(jasmine.any(String));
			});
		});
	});

	it('MakeWorkbook', ()=>{
		const book = MakeWorkbook({
			summary: summary(result),
			links: links(result),
		});

		const out = XLSX.write(book, {type: 'buffer'});
		expect(out).toBeDefined();
	});
});

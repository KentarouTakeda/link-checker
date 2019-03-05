import { parse } from '../src/parseLinks';
import { summary, links } from '../src/output';

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
});

import { getFileNameFromURL } from '../src/cli';

describe('cli', ()=>{
	describe('getFileNameFromURL', ()=>{
		it('https://www.google.co.jp', ()=>{
			const url = 'https://www.google.co.jp';
			const fileName = 'www.google.co.jp.xlsx';

			expect(getFileNameFromURL(url)).toBe(fileName);
		})

		it('fileスキーマ', ()=>{
			const url = 'file:///path/to/file';

			expect(getFileNameFromURL(url)).toBeNull();
		})
	});
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { rollupStripPlugin, type RollupStripOptions } from '../dist';

process.env.NODE_ENV = 'production';

const defaultOptions = { debug: false, start: 'devblock:start', end: 'devblock:end' };

const compare = (fixture: string, options: RollupStripOptions = {}) => {
  const filename = resolve(__dirname, `./fixtures/${fixture}`);
  const input = readFileSync(filename, 'utf-8');
  const output = rollupStripPlugin(options).transform(input, filename);
  return { input, output };
};

describe('rollupStripPlugin', () => {
  it('should leave normal files untouched', () => {
    const r = compare('simple.ts');
    expect(r.input).toEqual(r.output!.code);
  });

  it('should trip devblock by default', async () => {
    const testId = 'devblock-default.ts';
    const r = compare(testId);
    expect(r.input.includes(defaultOptions.start)).toBeTruthy();
    expect(r.input.includes(defaultOptions.end)).toBeTruthy();
    expect(r.output!.code.includes(defaultOptions.start)).toBeFalsy();
    expect(r.output!.code.includes(defaultOptions.end)).toBeFalsy();
  });

  it('should not trip devblock filter by options.exclude', () => {
    const testId = 'devblock-default.ts';
    let r = compare(testId, { exclude: '**/*.ts' });
    expect(r.output).toBeNull();

    r = compare(testId, { include: '**/*.js' });
    expect(r.output).toBeNull();
  });
});

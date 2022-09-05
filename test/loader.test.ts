import path from 'path';
import fs from 'fs';
import { compile, getCodeFromBundle, getCompiler, getErrors, getModuleSource, getWarnings } from './helpers';
import type { StripOptions } from '../src/index';

// const isWin = process.platform === 'win32';
const defaultOptions = { debug: false, start: 'devblock:start', end: 'devblock:end' };

describe('strip-loader', () => {
  it('should leave normal files untouched', async () => {
    const testId = 'simple.ts';

    const compiler = getCompiler(testId);
    const stats = await compile(compiler);
    const codeSource = fs.readFileSync(path.resolve(compiler.options.context, testId), 'utf8');
    const moduleSource = getModuleSource(testId, stats) as string;

    expect(codeSource.includes(defaultOptions.start)).toBeFalsy();
    expect(codeSource.includes(defaultOptions.end)).toBeFalsy();
    expect(moduleSource.includes(defaultOptions.start)).toBeFalsy();
    expect(moduleSource.includes(defaultOptions.end)).toBeFalsy();

    const codeFromBundle = getCodeFromBundle(stats, compiler);
    expect(codeFromBundle.map).toBeUndefined();
    expect(codeFromBundle.code).toMatchSnapshot('code');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
    expect(getErrors(stats)).toMatchSnapshot('errors');
  }, 10_000);

  it('should trip devblock by default', async () => {
    const testId = 'devblock-default.ts';
    const compiler = getCompiler(testId);
    const stats = await compile(compiler);
    const codeSource = fs.readFileSync(path.resolve(compiler.options.context, testId), 'utf8');
    const moduleSource = getModuleSource(testId, stats) as string;

    expect(codeSource.includes(defaultOptions.start)).toBeTruthy();
    expect(codeSource.includes(defaultOptions.end)).toBeTruthy();
    expect(moduleSource.includes(defaultOptions.start)).toBeFalsy();
    expect(moduleSource.includes(defaultOptions.end)).toBeFalsy();

    expect(getWarnings(stats)).toMatchSnapshot('warnings');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(moduleSource).toMatchSnapshot();
  }, 10_000);

  it('should not trip devblock when disabled', async () => {
    const testId = 'devblock-default.ts';
    const compiler = getCompiler(testId, { disabled: true });
    const stats = await compile(compiler);
    const codeSource = fs.readFileSync(path.resolve(compiler.options.context, testId), 'utf8');
    const moduleSource = getModuleSource(testId, stats) as string;

    expect(codeSource.includes(defaultOptions.start)).toBeTruthy();
    expect(codeSource.includes(defaultOptions.end)).toBeTruthy();
    expect(moduleSource.includes(defaultOptions.start)).toBeTruthy();
    expect(moduleSource.includes(defaultOptions.end)).toBeTruthy();
  }, 10_000);

  it('should trip devblock by custom options', async () => {
    const customOptions: StripOptions = {
      blocks: [
        {
          start: 'lzwme:debug:start',
          end: 'lzwme:debug:end',
        },
      ],
      isReplaceWithPlaceHolder: false,
      debug: true,
    };
    const testId = 'devblock-custom.ts';
    const compiler = getCompiler(testId, customOptions);
    const stats = await compile(compiler);
    const codeSource = fs.readFileSync(path.resolve(compiler.options.context, testId), 'utf8');
    const moduleSource = getModuleSource(testId, stats) as string;

    expect(codeSource.includes(customOptions.blocks[0].start)).toBeTruthy();
    expect(codeSource.includes(customOptions.blocks[0].end)).toBeTruthy();
    expect(moduleSource.includes(customOptions.blocks[0].start)).toBeFalsy();
    expect(moduleSource.includes(customOptions.blocks[0].end)).toBeFalsy();

    expect(getWarnings(stats)).toMatchSnapshot('warnings');
    expect(getErrors(stats)).toMatchSnapshot('errors');
  }, 10_000);
});

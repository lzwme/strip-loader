import { stripBlock, StripOptions } from './strip-block';

export interface RollupStripOptions extends StripOptions {
  /** A pattern, or array of patterns, which specify the files in the build the plugin should operate on. */
  include?: string | RegExp | Array<string | RegExp>;
  /** A pattern, or array of patterns, which specify the files in the build the plugin should ignore. */
  exclude?: string | RegExp | Array<string | RegExp>;
}

export function rollupStripPlugin(options: StripOptions = {}) {
  const { exclude, include = '**/*.(js|jsx|ts|tsx)' } = options;
  const { createFilter } = require('@rollup/pluginutils');
  const filter = createFilter(include, exclude);

  return {
    name: 'strip-block',
    transform(code: string, id: string) {
      if (!filter(id)) return null;

      return { code: stripBlock(code, options, { resourcePath: id }) };
    },
  };
}

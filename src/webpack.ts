import { stripBlock, type StripOptions } from './strip-block';

/**
 * strip loader
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 * {@see https://webpack.js.org/api/loaders/}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StripBlockLoader(this: any, content: string | Buffer, _map: any, _meta: any) {
  const options = this.getOptions() as StripOptions;

  content = stripBlock(content, options, this);
  if (this.cacheable) this.cacheable(true);

  return content;
}

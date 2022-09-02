const stats = { total: 0, striped: 0 };

/**
 * strip loader
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 * {@see https://webpack.js.org/api/loaders/}
 */
function StripBlockLoader(content, _map, _meta) {
  if (this.cacheable) this.cacheable(true);

  const options = this.getOptions();
  const startComment = options.start || 'devblock:start';
  const endComment = options.end || 'devblock:end';

  if (options.disabled) return content;

  stats.total++;

  if (content.includes(startComment) && content.includes(endComment)) {
    stats.striped++;

    if (options.debug || this.debug) {
      console.log('[strip-loader] for:', this.resourcePath, stats);
    }

    const regexPattern = new RegExp(`[\\t ]*{?\\/\\*+ ?${startComment} ?\\*\\/[\\s\\S]*?\\/\\*+ ?${endComment} ?\\*\\/}?[\\t ]*\\n?`, 'g');
    const group = content.match(regexPattern);

    if (group) {
      group.forEach(str => {
        const count = str.replace(/[^\t\n]/g, '').length + 1;
        content = content.replace(str, options.isReplaceWithPlaceHolder !== false ? `/* ${'\t\n'.repeat(count)} */` : '');
      });
    }
  }

  return content;
}

Object.defineProperty(exports, '__esModule', { value: true });
exports.default = StripBlockLoader;

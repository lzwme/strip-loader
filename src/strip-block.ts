export interface StripOptions {
  blocks?: {
    start: string;
    end?: string;
    prefix?: string;
    suffix?: string;
  }[];
  isReplaceWithPlaceHolder?: boolean;
  disabled?: boolean;
  debug?: boolean;
}

const stats = { total: 0, striped: 0 };

export function stripBlock(
  content: string | Buffer,
  options: StripOptions = {},
  context?: { resourcePath?: string } & Record<string, unknown>
) {
  if (options.disabled || typeof content !== 'string') return content;

  stats.total++;

  if (!Array.isArray(options.blocks)) {
    options.blocks = [{ start: 'devblock:start', end: 'devblock:end' }];
  }

  for (const block of options.blocks) {
    if (content.includes(block.start) && content.includes(block.end)) {
      stats.striped++;

      if (options.debug) {
        console.log('[strip-loader] for:', context?.resourcePath, block, stats);
      }

      const { start = 'devblock:start', end = 'devblock:end', prefix = '', suffix = '' } = block;
      const regexPattern = prefix
        ? new RegExp(`[\\t ]*{?${prefix} ?${start} ?${suffix}[\\s\\S]*?${prefix} ?${end} ?${suffix}}[\\t ]*\\n?`, 'g')
        : new RegExp(`[\\t ]*{?\\/\\*+ ?${start} ?\\*\\/[\\s\\S]*?\\/\\*+ ?${end} ?\\*\\/}?[\\t ]*\\n?`, 'g');
      const groups = content.match(regexPattern);

      if (groups) {
        const replaced = options.isReplaceWithPlaceHolder !== false ? '/* strip-loader */' : '';
        groups.forEach(str => {
          content = (content as string).replace(str, replaced);
        });
      }
    }
  }

  return content;
}

// export function escapeForRegex(str: string) {
//   return str.replace(/([\^|$|.|*|+|?|=|!|:|\\|/|(|)|[|\]|{|}])/gi, '\\$1');
// }

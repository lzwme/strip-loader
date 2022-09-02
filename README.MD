[![@lzwme/strip-loader](https://nodei.co/npm/@lzwme/strip-loader.png)][npm-url]

# @lzwme/strip-loader

[![NPM version][npm-badge]][npm-url]
[![node version][node-badge]][node-url]
![license MIT](https://img.shields.io/github/license/lzwme/strip-loader)

[![build status](https://github.com/lzwme/strip-loader/actions/workflows/node-ci.yml/badge.svg)](https://github.com/lzwme/strip-loader/actions/workflows/node-ci.yml)
[![npm download][download-badge]][download-url]
[![GitHub issues][issues-badge]][issues-url]
[![GitHub forks][forks-badge]][forks-url]
[![GitHub stars][stars-badge]][stars-url]

A simple webpack loader to strip custom debug statements from your code. This can be useful if you want to use debug statements while developing your app but don't want this info exposed in your production code.

## Getting Started

### Installation

To begin, you'll need to install the loader with npm, yarn or pnpm:

```bash
# use npm
npm install -D @lzwme/strip-loader
# or use yarn
yarn add -D @lzwme/strip-loader
# or use pnpm
pnpm add -D @lzwme/strip-loader
```

### Usage

In your webpack configuration object, you'll need to add `@lzwme/strip-loader` to your list of modules.

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        // test: /\.(css|scss|less|js|ts|tsx)?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: path.resolve('@lzwme/strip-loader'),
            options: {
              disabled: proces.env.NODE_ENV === 'development',
              // start: 'devblock:start',
              // end: 'devblock:end',
              // debug: false,
            },
          },
        ],
      },
    ];
  }
}
```

In your js/ts source files, For example:

```js
export class Abc {
  constructor() {
    console.log('test for production');

    /** devblock:start */
    this.test();
    /** devblock:end */
  }
  /** devblock:start */
  // this code block will be removed in production mode.
  private test() {
    console.log('test for development');
  }
  /** devblock:end */
}
```

## Options

|         Name                 |         Type         |         Default         | Description                                      |
| :--------------------------: | :------------------: | :---------------------: | :----------------------------------------------- |
| **start**                    |      `{string}`      |    `devblock:start`     | You can customize the start comment tag.         |
|  **end**                     |      `{string}`      |    `devblock:end`       | You can customize the end comment tag.           |
| **isReplaceWithPlaceHolder** |      `{boolean}`      |    `true`              | Replace the matched code block with placeholder. |
| **debug**                    |      `{boolean}`     |    `false`              | Print some debugging information.                |
| **disabled**                 |      `{boolean}`     |    `false`              | Disable the loader.                              |

## Development

```bash
git clone https://github.com/lzwme/strip-loader
pnpm install
pnpm test
```

## License

`@lzwme/strip-loader` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。


[stars-badge]: https://img.shields.io/github/stars/lzwme/strip-loader.svg
[stars-url]: https://github.com/lzwme/strip-loader/stargazers
[forks-badge]: https://img.shields.io/github/forks/lzwme/strip-loader.svg
[forks-url]: https://github.com/lzwme/strip-loader/network
[issues-badge]: https://img.shields.io/github/issues/lzwme/strip-loader.svg
[issues-url]: https://github.com/lzwme/strip-loader/issues
[npm-badge]: https://img.shields.io/npm/v/@lzwme/strip-loader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@lzwme/strip-loader
[node-badge]: https://img.shields.io/badge/node.js-%3E=_14.0.0-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-badge]: https://img.shields.io/npm/dm/@lzwme/strip-loader.svg?style=flat-square
[download-url]: https://npmjs.org/package/@lzwme/strip-loader
[bundlephobia-url]: https://bundlephobia.com/result?p=@lzwme/strip-loader@latest
[bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/@lzwme/strip-loader@latest
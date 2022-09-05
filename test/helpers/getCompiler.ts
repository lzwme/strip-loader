import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
import type { StripOptions } from '../../src/index';

export default function getCompiler(fixture: string, loaderOptions: StripOptions = {}, config: webpack.Configuration = {}) {
  const fullConfig: webpack.Configuration = {
    mode: 'development',
    devtool: config.devtool || 'source-map',
    context: path.resolve(__dirname, '../fixtures'),
    entry: path.resolve(__dirname, '../fixtures', fixture),
    output: {
      path: path.resolve(__dirname, '../outputs'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      library: 'stripLoaderExport',
      // devtoolModuleFilenameTemplate: "[absolute-resource-path]"
    },
    module: {
      rules: [
        {
          test: /\.(css|scss|less|js|ts|tsx)?$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: {
            loader: path.resolve(__dirname, '../../dist'),
            options: loaderOptions || {},
          },
        },
        {
          test: /\.tsx?$/i,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    plugins: [],
    ...config,
  };

  const compiler = webpack(fullConfig);

  // @ts-ignore
  if (!config.outputFileSystem) {
    compiler.outputFileSystem = createFsFromVolume(new Volume());
  }

  return compiler;
}
